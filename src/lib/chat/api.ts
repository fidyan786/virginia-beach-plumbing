import { isLiveEndpoint, type ChatApiRequest, type ChatApiResponse, type LeadPayload, type LeadSubmitResult } from './types';

export async function requestAiReply(
  endpoint: string,
  payload: ChatApiRequest
): Promise<ChatApiResponse | null> {
  if (!isLiveEndpoint(endpoint)) return null;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ChatApiResponse;
    if (!data || typeof data.reply !== 'string' || !data.reply.trim()) return null;
    return data;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function submitLead(endpoint: string, payload: LeadPayload): Promise<LeadSubmitResult> {
  if (!isLiveEndpoint(endpoint)) {
    return { submitted: false, reason: 'not_configured' };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { submitted: false, reason: 'http_error', status: res.status };
    }
    const data = (await res.json().catch(() => ({}))) as { submitted?: boolean };
    if (data && data.submitted === false) {
      return { submitted: false, reason: 'not_configured', status: res.status };
    }
    return { submitted: true, reason: 'submitted', status: res.status };
  } catch {
    return { submitted: false, reason: 'network_error' };
  }
}
