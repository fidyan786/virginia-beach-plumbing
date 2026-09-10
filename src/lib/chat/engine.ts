import {
  emptyLead,
  type ChatAction,
  type ChatIntent,
  type ChatMessage,
  type ChatSessionState,
  type LeadDraft,
  type LeadPayload,
  type PublicChatConfig,
} from './types';
import {
  formatPhone,
  isNonEmptyName,
  isNonEmptyText,
  isValidPhone,
  isValidZip,
  looksLikeVirginiaBeachZip,
  phoneDigits,
} from './validate';
import {
  WELCOME_TEXT,
  answerQuestion,
  applySafetyToReply,
  alreadyAnsweredFollowUp,
  areaReply,
  callAction,
  detectCorrection,
  detectCustomerType,
  detectIntent,
  emergencyActions,
  extractFacts,
  gasSafetyReply,
  hoursReply,
  humanReply,
  identifyService,
  isGasEmergency,
  isHumanRequest,
  isInjectionAttempt,
  isSevereEmergency,
  isSmallTalk,
  leadVariant,
  mergeFacts,
  pricingReply,
  serviceOfferActions,
  severeEmergencyReply,
  topicShiftService,
  welcomeActions,
} from './knowledge';

function id(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function now(): string {
  return new Date().toISOString();
}

function msg(role: ChatMessage['role'], text: string, actions?: ChatAction[]): ChatMessage {
  return { id: id('m'), role, text, actions, createdAt: now() };
}

function cloneState(state: ChatSessionState): ChatSessionState {
  return {
    ...state,
    lead: { ...state.lead },
    messages: [...state.messages],
  };
}

export function createChatSession(): ChatSessionState {
  return {
    sessionId: id('vbchat'),
    mode: 'welcome',
    intent: 'general',
    lead: emptyLead('general'),
    messages: [],
    awaitingEditField: null,
    pendingFollowUp: null,
  };
}

export function welcomeMessages(cfg: PublicChatConfig): ChatMessage[] {
  return [msg('assistant', WELCOME_TEXT, welcomeActions(cfg))];
}

export interface EngineTurn {
  state: ChatSessionState;
  newMessages: ChatMessage[];
  shouldSubmit?: boolean;
}

function firstLeadPrompt(lead: LeadDraft): { mode: ChatSessionState['mode']; prompt: string } {
  if (!lead.name) return { mode: 'lead_name', prompt: "What's your name?" };
  if (!lead.phone) return { mode: 'lead_phone', prompt: `Thanks, ${lead.name}. What's the best callback number?` };
  if (!lead.zip) {
    return { mode: 'lead_zip', prompt: "What's the 5-digit ZIP for the property? We serve Virginia Beach, VA." };
  }
  if (lead.customerType === 'unknown') {
    return { mode: 'lead_property', prompt: 'Is this for a home or a business?' };
  }
  if (!lead.issue) return { mode: 'lead_issue', prompt: "What's going on with the plumbing?" };
  if (!lead.preferredTime) return { mode: 'lead_time', prompt: 'When would you prefer service?' };
  return { mode: 'lead_confirm', prompt: '' };
}

function startLead(state: ChatSessionState, intent: ChatIntent, intro: string, cfg: PublicChatConfig): EngineTurn {
  const next = cloneState(state);
  next.intent = intent;
  next.lead = { ...state.lead, intent, urgency: intent === 'emergency' ? 'emergency' : state.lead.urgency };
  next.awaitingEditField = null;
  const extra =
    intent === 'emergency'
      ? ` If water's actively flooding, call ${cfg.phoneDisplay} now — we're open 24/7.`
      : '';
  const step = firstLeadPrompt(next.lead);
  next.mode = step.mode;
  const prompt = step.mode === 'lead_confirm' ? summaryText(next.lead, cfg) : `${intro}${extra} ${step.prompt}`.trim();
  const actions = step.mode === 'lead_confirm' ? confirmActions() : intent === 'emergency' ? [callAction(cfg)] : undefined;
  const messages = [msg('assistant', prompt, actions)];
  next.messages.push(...messages);
  return { state: next, newMessages: messages };
}

function confirmActions(): ChatAction[] {
  return [
    { id: 'submit-lead', label: 'Yes, Send Request', type: 'submit' },
    { id: 'edit-lead', label: 'Change Something', type: 'edit' },
  ];
}

function editFieldActions(): ChatAction[] {
  return [
    { id: 'edit-name', label: 'Name', type: 'edit' },
    { id: 'edit-phone', label: 'Phone', type: 'edit' },
    { id: 'edit-zip', label: 'ZIP', type: 'edit' },
    { id: 'edit-property', label: 'Home / business', type: 'edit' },
    { id: 'edit-issue', label: 'Issue', type: 'edit' },
    { id: 'edit-time', label: 'Time', type: 'edit' },
    { id: 'submit-lead', label: 'Yes, Send Request', type: 'submit' },
  ];
}

function summaryText(lead: LeadDraft, cfg: PublicChatConfig): string {
  const lines = [
    'Just to make sure I have everything right:',
    '',
    `Name: ${lead.name}`,
    `Phone: ${formatPhone(lead.phone)}`,
    `ZIP: ${lead.zip}`,
  ];
  if (lead.customerType !== 'unknown') {
    lines.push(`Type: ${lead.customerType === 'commercial' ? 'Business' : 'Home'}`);
  }
  lines.push(`Issue: ${lead.issue}`);
  if (lead.notes) lines.push(`Notes: ${lead.notes}`);
  lines.push(`Preferred time: ${lead.preferredTime}`);
  lines.push('');
  lines.push(`Want me to send this service request? If it's urgent, call ${cfg.phoneDisplay}.`);
  return lines.join('\n');
}

export function buildLeadPayload(state: ChatSessionState, pageUrl: string): LeadPayload {
  const path = (() => {
    try {
      return new URL(pageUrl).pathname;
    } catch {
      return '/';
    }
  })();

  const submitted = now();
  const name = state.lead.name.trim();
  const phone = formatPhone(state.lead.phone);
  const issue = state.lead.issue.trim();
  const identified = identifyService(issue || state.lead.notes);
  const notes = [state.lead.notes, state.lead.address ? `Address note: ${state.lead.address}` : '', state.lead.zip ? `ZIP ${state.lead.zip}` : '']
    .filter(Boolean)
    .join(' · ');

  return {
    source: 'chatbot',
    form_variant: leadVariant(state.intent),
    name,
    phone,
    phone_digits: state.lead.phoneDigits,
    service_needed: issue,
    preferred_time: state.lead.preferredTime.trim(),
    message: issue,
    landing_path: path,
    page_url: pageUrl,
    submitted_at: submitted,
    session_id: state.sessionId,
    intent: state.intent,
    caller_name: name,
    caller_phone: phone,
    service_address: state.lead.address || (state.lead.zip ? `Virginia Beach ZIP ${state.lead.zip}` : ''),
    customer_type: state.lead.customerType,
    service_type: state.lead.serviceType || identified?.serviceKey || 'other',
    emergency_status: state.intent === 'emergency' ? 'emergency' : state.lead.urgency,
    problem_description: issue,
    additional_notes: notes,
    call_timestamp: submitted,
    call_duration: null,
    call_id: null,
    lead_source: 'chatbot',
    lead_status: 'confirmed',
    transcript_reference: state.sessionId,
    call_recording_reference: null,
  };
}

export function handleQuickAction(state: ChatSessionState, actionId: string, cfg: PublicChatConfig): EngineTurn {
  if (actionId === 'cancel-lead' || actionId === 'start-over') {
    const next = createChatSession();
    next.sessionId = state.sessionId;
    const messages = welcomeMessages(cfg);
    next.messages = messages;
    return { state: next, newMessages: messages };
  }

  if (actionId === 'emergency' || actionId === 'emergency-callback') {
    const user = msg('user', actionId === 'emergency-callback' ? 'Request a callback' : 'Emergency Plumbing');
    const next = cloneState(state);
    next.messages.push(user);
    next.intent = 'emergency';
    next.lead.urgency = 'emergency';
    if (actionId === 'emergency-callback') {
      const leadTurn = startLead(next, 'emergency', "Alright — I'll take a short callback request.", cfg);
      return { state: leadTurn.state, newMessages: [user, ...leadTurn.newMessages] };
    }
    const bot = msg('assistant', severeEmergencyReply(cfg), emergencyActions(cfg));
    next.mode = 'qa';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (actionId === 'service') {
    const user = msg('user', 'Request Service');
    const next = cloneState(state);
    next.messages.push(user);
    const leadTurn = startLead(next, 'service', "Sure — I can get a service request started.", cfg);
    return { state: leadTurn.state, newMessages: [user, ...leadTurn.newMessages] };
  }

  if (actionId === 'quote') {
    const user = msg('user', 'Get a Quote');
    const next = cloneState(state);
    next.messages.push(user);
    const bot = msg('assistant', `${pricingReply()}`, serviceOfferActions(cfg));
    next.mode = 'qa';
    next.intent = 'quote';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (actionId === 'question') {
    const user = msg('user', 'Plumbing Questions');
    const bot = msg(
      'assistant',
      `Ask away — drains, leaks, water heaters, sewer issues, whatever's going on. I'll keep it practical for ${cfg.serviceArea}.`
    );
    const next = cloneState(state);
    next.mode = 'qa';
    next.intent = 'question';
    next.messages.push(user, bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (actionId === 'call' || actionId === 'call-emergency') {
    const user = msg('user', `Call ${cfg.phoneDisplay}`);
    const bot = msg(
      'assistant',
      `Call ${cfg.phoneDisplay}. We're open 24/7 for ${cfg.serviceArea}.`,
      [callAction(cfg)]
    );
    const next = cloneState(state);
    next.intent = 'call';
    next.messages.push(user, bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (actionId.startsWith('edit-')) {
    return handleEditChoice(state, actionId, cfg);
  }

  return handleUserText(state, actionId, cfg);
}

function handleEditChoice(state: ChatSessionState, actionId: string, cfg: PublicChatConfig): EngineTurn {
  const map: Record<
    string,
    { field: NonNullable<ChatSessionState['awaitingEditField']>; mode: ChatSessionState['mode']; prompt: string }
  > = {
    'edit-name': { field: 'name', mode: 'lead_name', prompt: 'What name should we use?' },
    'edit-phone': { field: 'phone', mode: 'lead_phone', prompt: "What's the best callback number?" },
    'edit-zip': { field: 'zip', mode: 'lead_zip', prompt: "What's the 5-digit ZIP?" },
    'edit-property': { field: 'customerType', mode: 'lead_property', prompt: 'Is this for a home or a business?' },
    'edit-issue': { field: 'issue', mode: 'lead_issue', prompt: "What's going on with the plumbing?" },
    'edit-time': { field: 'preferredTime', mode: 'lead_time', prompt: 'When would you prefer service?' },
  };
  const spec = map[actionId];
  if (!spec) {
    const bot = msg('assistant', 'What should I change?', editFieldActions());
    const next = cloneState(state);
    next.mode = 'lead_confirm';
    next.messages.push(bot);
    return { state: next, newMessages: [bot] };
  }
  const next = cloneState(state);
  next.mode = spec.mode;
  next.awaitingEditField = spec.field;
  const bot = msg('assistant', spec.prompt);
  next.messages.push(bot);
  return { state: next, newMessages: [bot] };
}

export function handleUserText(state: ChatSessionState, raw: string, cfg: PublicChatConfig): EngineTurn {
  const text = raw.replace(/\s+/g, ' ').trim().slice(0, 800);
  if (!text) return { state, newMessages: [] };

  if (isInjectionAttempt(text)) {
    const user = msg('user', text);
    const bot = msg('assistant', "I can't help with that. If you've got a plumbing issue in Virginia Beach, I'm here.");
    const next = cloneState(state);
    next.messages.push(user, bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (state.mode.startsWith('lead_') || state.mode === 'complete') {
    return handleLeadInput(state, text, cfg);
  }

  return handleQa(state, text, cfg);
}

function handleQa(state: ChatSessionState, text: string, cfg: PublicChatConfig): EngineTurn {
  const user = msg('user', text);
  const next = cloneState(state);
  next.messages.push(user);
  next.lead = mergeFacts(next.lead, extractFacts(text));

  if (isSmallTalk(text)) {
    const bot = msg('assistant', "😄 No worries. Whenever you're ready, tell me what's going on with the plumbing.");
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (isGasEmergency(text)) {
    const bot = msg('assistant', gasSafetyReply(cfg), emergencyActions(cfg));
    next.mode = 'qa';
    next.intent = 'emergency';
    next.lead.urgency = 'emergency';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (isHumanRequest(text)) {
    const bot = msg('assistant', humanReply(cfg), [callAction(cfg)]);
    next.intent = 'human';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  const shifted = topicShiftService(text);
  if (shifted) {
    next.lead.issue = text;
    next.lead.serviceType = shifted.serviceKey;
    next.lead.askedFollowUp = false;
    next.pendingFollowUp = shifted.followUp || null;
    const reply = shifted.followUp ? `${shifted.reply} ${shifted.followUp}` : shifted.reply;
    const bot = msg('assistant', applySafetyToReply(reply), shifted.intent === 'emergency' ? emergencyActions(cfg) : undefined);
    next.mode = 'qa';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (isSevereEmergency(text) || detectIntent(text) === 'emergency') {
    const bot = msg('assistant', severeEmergencyReply(cfg), emergencyActions(cfg));
    next.mode = 'qa';
    next.intent = 'emergency';
    next.lead.urgency = 'emergency';
    next.lead.issue = next.lead.issue || text;
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (next.pendingFollowUp) {
    next.lead.notes = text;
    next.lead.askedFollowUp = true;
    next.pendingFollowUp = null;
    if (!next.lead.issue) next.lead.issue = text;
    else next.lead.issue = `${next.lead.issue} — ${text}`;
    const bot = msg(
      'assistant',
      "Okay, that helps. I can't diagnose it from here, but I can start a service request if you want someone to take a look.",
      serviceOfferActions(cfg)
    );
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  const intent = detectIntent(text);
  next.intent = intent === 'general' ? next.intent : intent;

  if (intent === 'quote') {
    const bot = msg('assistant', pricingReply(), serviceOfferActions(cfg));
    next.mode = 'qa';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (intent === 'service') {
    const identified = identifyService(text);
    if (identified) {
      next.lead.issue = next.lead.issue || text;
      next.lead.serviceType = identified.serviceKey;
    }
    const intro = "Sure — I can get a service request started.";
    const leadTurn = startLead(next, 'service', intro, cfg);
    return { state: leadTurn.state, newMessages: [user, ...leadTurn.newMessages] };
  }

  if (/\b(hour|open|24\/7)\b/i.test(text)) {
    const bot = msg('assistant', hoursReply(cfg), [callAction(cfg)]);
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (/\b(area|serve|kempsville|oceanfront)\b/i.test(text) && !identifyService(text)) {
    const bot = msg('assistant', areaReply(cfg));
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  const identified = identifyService(text);
  if (identified) {
    if (identified.serviceKey !== next.lead.serviceType) {
      next.lead.askedFollowUp = false;
      next.lead.issue = text;
    } else {
      next.lead.issue = next.lead.issue || text;
    }
    next.lead.serviceType = identified.serviceKey;
    if (identified.followUp && !alreadyAnsweredFollowUp(identified, text) && !next.lead.askedFollowUp) {
      next.pendingFollowUp = identified.followUp;
      const bot = msg('assistant', applySafetyToReply(`${identified.reply} ${identified.followUp}`));
      next.mode = 'qa';
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    const bot = msg(
      'assistant',
      applySafetyToReply(`${identified.reply} Want me to start a service request?`),
      serviceOfferActions(cfg)
    );
    next.mode = 'qa';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  const reply = answerQuestion(text, cfg);
  const bot = msg('assistant', applySafetyToReply(reply));
  next.mode = 'qa';
  next.messages.push(bot);
  return { state: next, newMessages: [user, bot] };
}

function handleLeadInput(state: ChatSessionState, text: string, cfg: PublicChatConfig): EngineTurn {
  const lower = text.toLowerCase();
  const user = msg('user', text);
  const next = cloneState(state);
  next.messages.push(user);
  next.lead = mergeFacts(next.lead, extractFacts(text));

  if (state.mode === 'complete') {
    if (isHumanRequest(text) || isSevereEmergency(text) || detectIntent(text) !== 'general') {
      return handleQa({ ...state, mode: 'qa' }, text, cfg);
    }
    const bot = msg(
      'assistant',
      `If you need anything else, call ${cfg.phoneDisplay} or start a new request.`,
      welcomeActions(cfg)
    );
    next.mode = 'welcome';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (/\b(cancel|nevermind|never mind|stop|start over)\b/.test(lower) && !topicShiftService(text)) {
    const reset = createChatSession();
    reset.sessionId = state.sessionId;
    const welcome = welcomeMessages(cfg);
    reset.messages = [user, ...welcome];
    return { state: reset, newMessages: [user, ...welcome] };
  }

  const shifted = topicShiftService(text);
  if (shifted) {
    next.lead.issue = text;
    next.lead.serviceType = shifted.serviceKey;
    next.awaitingEditField = null;
    if (shifted.intent === 'emergency') {
      next.intent = 'emergency';
      const bot = msg('assistant', severeEmergencyReply(cfg), emergencyActions(cfg));
      next.mode = 'qa';
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    const step = firstLeadPrompt(next.lead);
    if (step.mode === 'lead_confirm') return goToConfirm(next, cfg, [user]);
    next.mode = step.mode;
    const bot = msg('assistant', `Got it — ${shifted.service}. ${step.prompt}`);
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (isGasEmergency(text)) {
    const bot = msg('assistant', gasSafetyReply(cfg), emergencyActions(cfg));
    next.intent = 'emergency';
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  const correction = detectCorrection(text);
  if (correction?.field === 'phone' && correction.value && isValidPhone(correction.value)) {
    next.lead.phone = formatPhone(correction.value);
    next.lead.phoneDigits = phoneDigits(correction.value);
    const bot = msg('assistant', `Got it — I'll use ${next.lead.phone}.`);
    if (state.mode === 'lead_confirm') return goToConfirm(next, cfg, [user]);
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }
  if (correction && (state.mode === 'lead_confirm' || next.awaitingEditField)) {
    const editId = correction.field === 'preferredTime' ? 'edit-time' : `edit-${correction.field}`;
    return handleEditChoice(next, editId, cfg);
  }

  if (isHumanRequest(text)) {
    const bot = msg('assistant', humanReply(cfg), [callAction(cfg)]);
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (state.mode === 'lead_confirm') {
    if (/\b(yes|yep|yeah|submit|looks good|confirm|send|correct|do it)\b/.test(lower)) {
      return { state: next, newMessages: [user], shouldSubmit: true };
    }
    if (/\b(no|edit|change|wait)\b/.test(lower)) {
      const bot = msg('assistant', 'What should I change?', editFieldActions());
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    const bot = msg(
      'assistant',
      'Tap Yes, Send Request if this looks right, or Change Something to edit.',
      confirmActions()
    );
    next.messages.push(bot);
    return { state: next, newMessages: [user, bot] };
  }

  if (state.mode === 'lead_name' || next.awaitingEditField === 'name') {
    if (isValidPhone(text) && !/[a-zA-Z]{2,}/.test(text)) {
      next.lead.phone = formatPhone(text);
      next.lead.phoneDigits = phoneDigits(text);
      const bot = msg('assistant', "Got that number. What's your name?");
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    if (identifyService(text) && !/\b(my name is|this is|i['’]m|i am)\b/i.test(text)) {
      next.lead.issue = text;
      const identified = identifyService(text);
      if (identified) next.lead.serviceType = identified.serviceKey;
      const bot = msg('assistant', "Got it. What's your name so we can get this started?");
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    if (!isNonEmptyName(text)) {
      const bot = msg('assistant', "I need a name with letters — at least a couple characters.");
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    next.lead.name = text.replace(/\s+/g, ' ').trim();
    if (next.awaitingEditField) return goToConfirm(next, cfg, [user]);
    return advanceLead(next, cfg, [user]);
  }

  if (state.mode === 'lead_phone' || next.awaitingEditField === 'phone') {
    if (!isValidPhone(text)) {
      const bot = msg('assistant', 'That number looks a little short. Can you send the 10-digit U.S. number?');
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    next.lead.phone = formatPhone(text);
    next.lead.phoneDigits = phoneDigits(text);
    if (next.awaitingEditField) return goToConfirm(next, cfg, [user]);
    return advanceLead(next, cfg, [user]);
  }

  if (state.mode === 'lead_zip' || next.awaitingEditField === 'zip') {
    const zip = text.replace(/\D/g, '').slice(0, 5);
    if (!isValidZip(zip)) {
      const bot = msg('assistant', "I need a 5-digit ZIP for the property.");
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    next.lead.zip = zip;
    if (next.awaitingEditField) return goToConfirm(next, cfg, [user]);
    return advanceLead(next, cfg, [user], looksLikeVirginiaBeachZip(zip) ? '' : "If that ZIP is outside Virginia Beach, we may not be able to take the job.");
  }

  if (state.mode === 'lead_property' || next.awaitingEditField === 'customerType') {
    const type = detectCustomerType(text);
    if (!type) {
      const bot = msg('assistant', 'Is this for a home or a business?');
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    next.lead.customerType = type;
    if (type === 'commercial') {
      next.lead.notes = [next.lead.notes, 'Commercial inquiry'].filter(Boolean).join(' · ');
    }
    if (next.awaitingEditField) return goToConfirm(next, cfg, [user]);
    return advanceLead(next, cfg, [user]);
  }

  if (state.mode === 'lead_issue' || next.awaitingEditField === 'issue') {
    if (!isNonEmptyText(text, 4)) {
      const bot = msg('assistant', "Tell me a little more about what's going on.");
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    next.lead.issue = text;
    const identified = identifyService(text);
    if (identified) next.lead.serviceType = identified.serviceKey;
    if (isGasEmergency(text)) {
      const bot = msg('assistant', gasSafetyReply(cfg), emergencyActions(cfg));
      next.messages.push(bot);
    }
    if (next.awaitingEditField) return goToConfirm(next, cfg, [user]);
    return advanceLead(next, cfg, [user]);
  }

  if (state.mode === 'lead_time' || next.awaitingEditField === 'preferredTime') {
    if (!isNonEmptyText(text, 2)) {
      const bot = msg('assistant', 'Even “as soon as possible” is fine — when works?');
      next.messages.push(bot);
      return { state: next, newMessages: [user, bot] };
    }
    next.lead.preferredTime = text;
    return goToConfirm(next, cfg, [user]);
  }

  return { state: next, newMessages: [user] };
}

function advanceLead(state: ChatSessionState, cfg: PublicChatConfig, already: ChatMessage[], prefix = ''): EngineTurn {
  const next = cloneState(state);
  next.awaitingEditField = null;
  const step = firstLeadPrompt(next.lead);
  next.mode = step.mode;
  if (step.mode === 'lead_confirm') {
    return goToConfirm(next, cfg, already);
  }
  const text = [prefix, step.prompt].filter(Boolean).join(' ');
  const bot = msg('assistant', text);
  next.messages.push(bot);
  return { state: next, newMessages: [...already, bot] };
}

function goToConfirm(state: ChatSessionState, cfg: PublicChatConfig, already: ChatMessage[]): EngineTurn {
  const next = cloneState(state);
  next.mode = 'lead_confirm';
  next.awaitingEditField = null;
  const bot = msg('assistant', summaryText(next.lead, cfg), confirmActions());
  next.messages.push(bot);
  return { state: next, newMessages: [...already, bot] };
}

export function submittedMessages(cfg: PublicChatConfig, name: string): ChatMessage[] {
  return [
    msg(
      'assistant',
      `Done. Your service request has been sent${name ? `, ${name}` : ''}. This is not a dispatch confirmation. If it is urgent, call ${cfg.phoneDisplay}. We are open 24/7.`,
      [callAction(cfg), { id: 'start-over', label: 'Ask something else', type: 'quick' }]
    ),
  ];
}

export function notSubmittedMessages(
  cfg: PublicChatConfig,
  reason: 'not_configured' | 'http_error' | 'network_error'
): ChatMessage[] {
  const extra =
    reason === 'not_configured'
      ? 'Online requests are temporarily unavailable.'
      : "I couldn't send that request just now.";
  return [
    msg(
      'assistant',
      `${extra} Please call ${cfg.phoneDisplay} so you can get help without waiting.`,
      [callAction(cfg), { id: 'link-contact', label: 'Contact page', type: 'link', href: '/contact/' }]
    ),
  ];
}

export function assistantFromApi(text: string, cfg: PublicChatConfig, startLead = false): EngineTurn['newMessages'] {
  const safe = applySafetyToReply(text);
  if (startLead) return [msg('assistant', safe)];
  return [msg('assistant', safe)];
}
