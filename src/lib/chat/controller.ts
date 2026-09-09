import { requestAiReply, submitLead } from './api';
import {
  assistantFromApi,
  buildLeadPayload,
  createChatSession,
  handleQuickAction,
  handleUserText,
  notSubmittedMessages,
  submittedMessages,
  welcomeMessages,
} from './engine';
import { isGasEmergency, isInjectionAttempt, isSevereEmergency } from './knowledge';
import { remainingDisplayDelay, typingDelayMs } from './timing';
import { isLiveEndpoint, type ChatAction, type ChatMessage, type ChatSessionState, type PublicChatConfig } from './types';

declare global {
  interface Window {
    trackEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

function track(name: string, params?: Record<string, unknown>) {
  try {
    window.trackEvent?.(name, params);
  } catch {
    /* analytics is optional */
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMessageText(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br />');
}

function actionHtml(action: ChatAction): string {
  const label = escapeHtml(action.label);
  if (action.type === 'tel' && action.href) {
    return `<a class="vb-chat__chip vb-chat__chip--call" href="${escapeHtml(action.href)}" data-chat-tel="${escapeHtml(action.id)}" data-track="phone_click" data-track-location="chat">${label}</a>`;
  }
  if (action.type === 'link' && action.href) {
    return `<a class="vb-chat__chip" href="${escapeHtml(action.href)}" data-chat-link="${escapeHtml(action.id)}">${label}</a>`;
  }
  const kind = action.type === 'submit' ? 'submit' : action.type === 'edit' ? 'edit' : 'quick';
  return `<button type="button" class="vb-chat__chip" data-chat-action="${escapeHtml(action.id)}" data-chat-kind="${kind}">${label}</button>`;
}

function messageHtml(message: ChatMessage, brandName: string): string {
  const who = message.role === 'user' ? 'You' : brandName;
  const actions = message.actions?.length
    ? `<div class="vb-chat__chips">${message.actions.map(actionHtml).join('')}</div>`
    : '';
  return `<div class="vb-chat__msg vb-chat__msg--${message.role}" data-msg-id="${escapeHtml(message.id)}">
    <p class="vb-chat__who">${escapeHtml(who)}</p>
    <div class="vb-chat__bubble">${formatMessageText(message.text)}</div>
    ${actions}
  </div>`;
}

function typingHtml(brandName: string): string {
  return `<div class="vb-chat__msg vb-chat__msg--assistant" data-typing aria-hidden="true">
    <p class="vb-chat__who">${escapeHtml(brandName)}</p>
    <div class="vb-chat__bubble vb-chat__bubble--typing">
      <span></span><span></span><span></span>
    </div>
  </div>`;
}

function focusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true');
}

const RATE_WINDOW_MS = 20_000;
const RATE_MAX_TURNS = 12;

export function mountChatWidget(root: HTMLElement, cfg: PublicChatConfig): void {
  const launcher = root.querySelector<HTMLButtonElement>('[data-chat-open]');
  const panel = root.querySelector<HTMLElement>('[data-chat-panel]');
  const closeBtn = root.querySelector<HTMLButtonElement>('[data-chat-close]');
  const log = root.querySelector<HTMLElement>('[data-chat-log]');
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]');
  const input = root.querySelector<HTMLTextAreaElement>('[data-chat-input]');
  const live = root.querySelector<HTMLElement>('[data-chat-live]');

  if (!launcher || !panel || !closeBtn || !log || !form || !input) return;

  panel.inert = true;

  let state: ChatSessionState = createChatSession();
  let open = false;
  let busy = false;
  let disposed = false;
  let lastFocused: HTMLElement | null = null;
  let queued: (() => Promise<void>) | null = null;
  const timers = new Set<number>();
  const recentTurns: number[] = [];
  let lastUserText = '';
  let repeatCount = 0;

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        resolve();
      }, Math.max(0, ms));
      timers.add(id);
    });

  const render = (opts?: { typing?: boolean }) => {
    const showTyping = Boolean(opts?.typing);
    log.innerHTML =
      state.messages.map((m) => messageHtml(m, cfg.brandName)).join('') + (showTyping ? typingHtml(cfg.brandName) : '');
    log.scrollTop = log.scrollHeight;
    input.disabled = busy;
    form.querySelector<HTMLButtonElement>('[data-chat-send]')?.toggleAttribute('disabled', busy);
    panel.setAttribute('aria-busy', busy ? 'true' : 'false');
  };

  const announce = (text: string) => {
    if (!live) return;
    live.textContent = '';
    live.textContent = text;
  };

  const setBusy = (next: boolean, typing = next) => {
    busy = next;
    render({ typing });
  };

  const messagesWithout = (messages: ChatMessage[], hide: ChatMessage[]) => {
    const ids = new Set(hide.map((m) => m.id));
    return messages.filter((m) => !ids.has(m.id));
  };

  const playTurn = async (turn: { state: ChatSessionState; newMessages: ChatMessage[]; shouldSubmit?: boolean }) => {
    if (disposed) return;
    const botMsgs = turn.newMessages.filter((m) => m.role === 'assistant');
    const preview: ChatSessionState = {
      ...turn.state,
      messages: messagesWithout(turn.state.messages, botMsgs),
    };
    state = preview;
    if (!botMsgs.length) {
      render();
      if (turn.shouldSubmit) await runSubmit();
      return;
    }

    setBusy(true, true);
    await sleep(typingDelayMs(botMsgs[0].text));
    if (disposed) return;

    state = turn.state;
    setBusy(false, false);
    announce(botMsgs[botMsgs.length - 1].text);
    if (turn.shouldSubmit) await runSubmit();
  };

  const rateLimited = (): boolean => {
    const now = Date.now();
    while (recentTurns.length && now - recentTurns[0] > RATE_WINDOW_MS) recentTurns.shift();
    recentTurns.push(now);
    return recentTurns.length > RATE_MAX_TURNS;
  };

  let running = false;

  const runQueued = async () => {
    while (queued && !running && !disposed) {
      const next = queued;
      queued = null;
      running = true;
      try {
        await next();
      } finally {
        running = false;
      }
    }
  };

  const enqueue = (work: () => Promise<void>) => {
    if (disposed) return;
    if (running || busy) {
      queued = work;
      return;
    }
    running = true;
    void work()
      .catch(() => {
        /* keep the widget usable if a turn throws */
      })
      .finally(() => {
        running = false;
        void runQueued();
      });
  };

  const setOpen = (next: boolean) => {
    if (next === open) return;
    open = next;
    launcher.setAttribute('aria-expanded', next ? 'true' : 'false');
    root.classList.toggle('is-open', next);

    if (next) {
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      panel.removeAttribute('hidden');
      panel.inert = false;
      bindViewport();
      syncKeyboard();
      requestAnimationFrame(() => {
        panel.classList.add('is-visible');
        closeBtn.focus();
      });
      if (state.messages.length === 0) {
        enqueue(async () => {
          const welcome = welcomeMessages(cfg);
          await playTurn({ state: { ...state, messages: welcome }, newMessages: welcome });
        });
      }
      track('chat_open', { path: window.location.pathname });
    } else {
      panel.classList.remove('is-visible');
      panel.inert = true;
      unbindViewport();
      panel.style.setProperty('--kb', '0px');
      const hideId = window.setTimeout(() => {
        timers.delete(hideId);
        if (!open) panel.setAttribute('hidden', '');
      }, 200);
      timers.add(hideId);
      (lastFocused || launcher).focus();
    }
  };

  const runSubmit = async () => {
    if (state.mode !== 'lead_confirm') return;
    const started = Date.now();
    setBusy(true, true);
    const payload = buildLeadPayload(state, window.location.href);
    const result = await submitLead(cfg.leadEndpoint, payload);
    if (disposed) return;
    track('chat_lead_submit_attempt', { submitted: result.submitted, reason: result.reason });

    const extra = result.submitted
      ? submittedMessages(cfg, state.lead.name)
      : notSubmittedMessages(
          cfg,
          result.reason === 'not_configured' ? 'not_configured' : result.reason === 'http_error' ? 'http_error' : 'network_error'
        );

    if (result.submitted) {
      const wait = remainingDisplayDelay(started, extra[0].text);
      if (wait > 0) await sleep(wait);
    }

    if (disposed) return;
    state = {
      ...state,
      mode: result.submitted ? 'complete' : 'lead_confirm',
      messages: [...state.messages, ...extra],
    };
    setBusy(false, false);
    announce(extra[0].text);
  };

  const handleTurn = async (turn: { state: ChatSessionState; newMessages: ChatMessage[]; shouldSubmit?: boolean }) => {
    await playTurn(turn);
  };

  const sendText = async (text: string) => {
    const trimmed = text.replace(/\s+/g, ' ').trim().slice(0, 800);
    if (!trimmed) return;

    if (trimmed === lastUserText) {
      repeatCount += 1;
    } else {
      lastUserText = trimmed;
      repeatCount = 1;
    }

    const inLead = state.mode.startsWith('lead_') || state.mode === 'complete';
    if (!inLead && rateLimited()) {
      const createdAt = new Date().toISOString();
      const user: ChatMessage = { id: `rate-${Date.now()}`, role: 'user', text: trimmed, createdAt };
      const bot: ChatMessage = {
        id: `rate-bot-${Date.now()}`,
        role: 'assistant',
        text: "Easy — one message at a time. What's going on with the plumbing?",
        createdAt,
      };
      await playTurn({
        state: { ...state, messages: [...state.messages, user, bot] },
        newMessages: [user, bot],
      });
      return;
    }

    if (repeatCount >= 4) {
      const user: ChatMessage = {
        id: `dup-${Date.now()}`,
        role: 'user',
        text: trimmed,
        createdAt: new Date().toISOString(),
      };
      const bot: ChatMessage = {
        id: `dup-bot-${Date.now()}`,
        role: 'assistant',
        text: `I already have that. If you need help now, call ${cfg.phoneDisplay}.`,
        createdAt: new Date().toISOString(),
      };
      await playTurn({
        state: { ...state, messages: [...state.messages, user, bot] },
        newMessages: [user, bot],
      });
      return;
    }

    const forceLocal =
      isSevereEmergency(trimmed) || isGasEmergency(trimmed) || isInjectionAttempt(trimmed) || inLead;
    const tryAi = !forceLocal && isLiveEndpoint(cfg.chatEndpoint);

    if (!tryAi) {
      await handleTurn(handleUserText(state, trimmed, cfg));
      return;
    }

    const local = handleUserText(state, trimmed, cfg);
    const userMsg = local.newMessages.find((m) => m.role === 'user');
    if (!userMsg) {
      await handleTurn(local);
      return;
    }

    const pending: ChatSessionState = {
      ...state,
      intent: local.state.intent,
      mode: 'qa',
      messages: [...state.messages, userMsg],
    };
    state = pending;
    const started = Date.now();
    setBusy(true, true);

    const ai = await requestAiReply(cfg.chatEndpoint, {
      sessionId: state.sessionId,
      pageUrl: window.location.href,
      intent: pending.intent,
      mode: pending.mode,
      messages: pending.messages.map((m) => ({ role: m.role, content: m.text })),
    });
    if (disposed) return;

    if (ai?.reply) {
      const botMsgs = assistantFromApi(ai.reply, cfg, false);
      const wait = remainingDisplayDelay(started, botMsgs[0].text);
      if (wait > 0) await sleep(wait);
      if (disposed) return;
      state = {
        ...pending,
        intent: ai.intent || pending.intent,
        messages: [...pending.messages, ...botMsgs],
      };
      setBusy(false, false);
      announce(botMsgs[0].text);
      return;
    }

    const withoutDupUser: ChatSessionState = {
      ...state,
      messages: state.messages.filter((m) => m.id !== userMsg.id),
    };
    const fallback = handleUserText(withoutDupUser, trimmed, cfg);
    state = fallback.state;
    setBusy(false, false);
    const lastBot = [...fallback.newMessages].reverse().find((m) => m.role === 'assistant');
    if (lastBot) announce(lastBot.text);
    if (fallback.shouldSubmit) await runSubmit();
  };

  const syncKeyboard = () => {
    if (!open) {
      panel.style.setProperty('--kb', '0px');
      return;
    }
    const vv = window.visualViewport;
    if (!vv) {
      panel.style.setProperty('--kb', '0px');
      return;
    }
    const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    panel.style.setProperty('--kb', `${Math.round(kb)}px`);
  };

  let viewportBound = false;
  const bindViewport = () => {
    if (viewportBound) return;
    viewportBound = true;
    window.visualViewport?.addEventListener('resize', syncKeyboard);
  };
  const unbindViewport = () => {
    if (!viewportBound) return;
    viewportBound = false;
    window.visualViewport?.removeEventListener('resize', syncKeyboard);
    window.visualViewport?.removeEventListener('scroll', syncKeyboard);
    window.removeEventListener('resize', syncKeyboard);
  };

  launcher.addEventListener('click', () => setOpen(!open));
  closeBtn.addEventListener('click', () => setOpen(false));

  root.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = focusable(panel);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  log.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const actionBtn = target.closest<HTMLElement>('[data-chat-action]');
    if (!actionBtn) return;
    const actionId = actionBtn.getAttribute('data-chat-action') || '';
    const kind = actionBtn.getAttribute('data-chat-kind');
    track('chat_quick_action', { action: actionId });

    enqueue(async () => {
      if (kind === 'submit' || actionId === 'submit-lead') {
        await runSubmit();
        return;
      }
      await handleTurn(handleQuickAction(state, actionId, cfg));
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    input.style.height = '';
    enqueue(async () => {
      await sendText(value);
    });
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
  });

  const dispose = () => {
    disposed = true;
    queued = null;
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
    unbindViewport();
    document.removeEventListener('astro:before-swap', dispose);
    window.removeEventListener('pagehide', dispose);
  };

  document.addEventListener('astro:before-swap', dispose);
  window.addEventListener('pagehide', dispose);

  render();
}
