/**
 * Backend integration for the plumbing chatbot.
 *
 * FRONTEND NEVER CALLS AI PROVIDERS DIRECTLY.
 * Put secrets in server environment variables only:
 *
 *   CHAT_AI_PROVIDER   = none | openai | anthropic
 *   CHAT_AI_API_KEY    = provider secret (never ship to the browser)
 *   CHAT_AI_MODEL      = optional model id
 *   CHAT_AI_ENDPOINT   = optional custom provider URL
 *   LEAD_WEBHOOK_URL   = CRM / Sheets / email / webhook inbox
 *                         Recommended: the voice receptionist `POST /api/leads`
 *                         so chat, forms, and phone share one pipeline.
 *
 * Recommended production backend (does not change this static SSG site):
 *   ../voice  — Twilio inbound + conversation engine + lead store/notify
 *
 * Mount these handlers on your host:
 *
 *   Astro (needs an adapter; this site is static SSG by default):
 *     src/pages/api/chat.ts  → export const prerender = false; export POST = handleChatPost
 *     src/pages/api/leads.ts → export const prerender = false; export POST = handleLeadPost
 *
 *   Then set siteConfig.chat.chatEndpoint = '/api/chat/'
 *   and siteConfig.formEndpoint or siteConfig.chat.leadEndpoint to '/api/leads/'
 *
 * Until those URLs are live, the widget uses the on-site assistant and will not
 * claim that a lead was submitted.
 */

import type { ChatApiRequest, ChatApiResponse, LeadPayload } from './types';

const SYSTEM_PROMPT = `You are a local plumbing assistant for Virginia Beach Plumbing in Virginia Beach, VA.

Voice:
- Short, natural replies. Contractions. One question at a time.
- Sound like a helpful local service person, not a corporate bot or ChatGPT.
- Acknowledge what they just said. Do not re-ask facts already in the conversation (name, phone, ZIP, issue, time).

Verified facts only:
- Phone: (703) 703-7855
- Hours: 24/7
- Service area: Virginia Beach, VA
- Residential and commercial plumbing

Never invent: prices, discounts, licenses, certifications, reviews, ratings, awards, years in business, technician names, street address, guarantees, ETAs, or dispatch status.

Emergencies:
- Burst pipes, flooding, major leaks, sewer backup: urge calling (703) 703-7855 now. If flooding, shut off the main water supply only if safe. Do not give dangerous DIY repair steps.
- Gas smell: leave, avoid switches/flames, call the gas utility or 911 from a safe place. Do not pretend to transfer or dispatch.

If they ask for a human: do not fake a transfer. The fastest option is to call (703) 703-7855.

Pricing: do not quote numbers. Offer to start a service request.

If unsure: say so and ask whether it is mainly a leak, clog, water heater problem, or something else.

City-side water/sewer issues may belong to Virginia Beach Public Utilities (757-385-3111).`;

type Env = Record<string, string | undefined>;

function env(name: string): string {
  const meta = (import.meta as ImportMeta & { env?: Env }).env || {};
  return (meta[name] || '').trim();
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function handleChatPost(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body: ChatApiRequest;
  try {
    body = (await request.json()) as ChatApiRequest;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const provider = (env('CHAT_AI_PROVIDER') || 'none').toLowerCase();
  const apiKey = env('CHAT_AI_API_KEY');

  if (provider === 'none' || !apiKey) {
    return json(
      {
        useLocal: true,
        reply: '',
        reason: 'ai_not_configured',
        hint: 'Set CHAT_AI_PROVIDER and CHAT_AI_API_KEY on the server, then point siteConfig.chat.chatEndpoint at this route.',
      },
      503
    );
  }

  try {
    const reply = await completeChat(provider, apiKey, body);
    const response: ChatApiResponse = { reply };
    return json(response);
  } catch (err) {
    console.error('[chat api]', err);
    return json({ error: 'AI provider request failed', useLocal: true }, 502);
  }
}

export async function handleLeadPost(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ submitted: false, reason: 'invalid' }, 400);
  }

  if (!payload?.name || !payload?.phone_digits || payload.phone_digits.length !== 10 || !payload.service_needed) {
    return json({ submitted: false, reason: 'invalid' }, 400);
  }

  const webhook = env('LEAD_WEBHOOK_URL');
  if (!webhook) {
    return json(
      {
        submitted: false,
        reason: 'not_configured',
        hint: 'Set LEAD_WEBHOOK_URL to your CRM, Sheets, email, or webhook inbox.',
      },
      503
    );
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return json({ submitted: false, reason: 'http_error', status: res.status }, 502);
  }

  return json({ submitted: true, reason: 'submitted' });
}

async function completeChat(provider: string, apiKey: string, body: ChatApiRequest): Promise<string> {
  const model = env('CHAT_AI_MODEL');
  const custom = env('CHAT_AI_ENDPOINT');
  const messages = (body.messages || []).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));

  if (provider === 'anthropic') {
    const url = custom || 'https://api.anthropic.com/v1/messages';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-4-5',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    if (!res.ok) throw new Error(`Anthropic HTTP ${res.status}`);
    const data = (await res.json()) as { content?: Array<{ text?: string }> };
    const text = data.content?.map((c) => c.text || '').join('\n').trim();
    if (!text) throw new Error('Empty Anthropic reply');
    return text;
  }

  const url = custom || 'https://api.openai.com/v1/chat/completions';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      max_tokens: 400,
      temperature: 0.4,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI-compatible HTTP ${res.status}`);
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('Empty OpenAI-compatible reply');
  return text;
}

export { SYSTEM_PROMPT };
