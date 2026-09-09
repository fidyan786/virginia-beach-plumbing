import type { CustomerType, EmergencyStatus, UnifiedLeadFields } from '../leads/schema';

export type ChatRole = 'assistant' | 'user';

export type ChatIntent =
  | 'emergency'
  | 'service'
  | 'quote'
  | 'question'
  | 'call'
  | 'human'
  | 'general';

export type ChatMode =
  | 'welcome'
  | 'qa'
  | 'lead_name'
  | 'lead_phone'
  | 'lead_zip'
  | 'lead_property'
  | 'lead_issue'
  | 'lead_time'
  | 'lead_confirm'
  | 'complete';

export type ChatActionType = 'quick' | 'tel' | 'link' | 'confirm' | 'edit' | 'submit';

export interface ChatAction {
  id: string;
  label: string;
  type: ChatActionType;
  href?: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  actions?: ChatAction[];
  createdAt: string;
}

export interface LeadDraft {
  name: string;
  phone: string;
  phoneDigits: string;
  zip: string;
  address: string;
  customerType: CustomerType;
  issue: string;
  serviceType: string;
  preferredTime: string;
  notes: string;
  urgency: EmergencyStatus;
  intent: ChatIntent;
  askedFollowUp: boolean;
}

export interface LeadPayload extends UnifiedLeadFields {
  source: 'chatbot';
  form_variant: 'chat_emergency' | 'chat_service' | 'chat_quote';
  name: string;
  phone: string;
  phone_digits: string;
  service_needed: string;
  preferred_time: string;
  message: string;
  landing_path: string;
  page_url: string;
  submitted_at: string;
  session_id: string;
  intent: ChatIntent;
}

export interface PublicChatConfig {
  brandName: string;
  phoneDisplay: string;
  phoneTel: string;
  hoursDisplay: string;
  serviceArea: string;
  cityUtilitiesEmergencyPhone: string;
  cityUtilitiesEmergencyUrl: string;
  chatEndpoint: string;
  leadEndpoint: string;
}

export interface ChatSessionState {
  sessionId: string;
  mode: ChatMode;
  intent: ChatIntent;
  lead: LeadDraft;
  messages: ChatMessage[];
  awaitingEditField: keyof Pick<
    LeadDraft,
    'name' | 'phone' | 'zip' | 'issue' | 'preferredTime' | 'customerType'
  > | null;
  pendingFollowUp: string | null;
}

export interface ChatApiRequest {
  sessionId: string;
  pageUrl: string;
  messages: Array<{ role: ChatRole; content: string }>;
  intent: ChatIntent;
  mode: ChatMode;
}

export interface ChatApiResponse {
  reply: string;
  startLead?: boolean;
  intent?: ChatIntent;
  actions?: ChatAction[];
}

export type LeadSubmitReason =
  | 'submitted'
  | 'not_configured'
  | 'http_error'
  | 'network_error'
  | 'invalid';

export interface LeadSubmitResult {
  submitted: boolean;
  reason: LeadSubmitReason;
  status?: number;
}

export function isLiveEndpoint(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.includes('REQUIRED') || trimmed.includes('OPTIONAL')) return false;
  if (trimmed.startsWith('[')) return false;
  return /^https?:\/\//i.test(trimmed) || trimmed.startsWith('/');
}

export function emptyLead(intent: ChatIntent = 'general'): LeadDraft {
  return {
    name: '',
    phone: '',
    phoneDigits: '',
    zip: '',
    address: '',
    customerType: 'unknown',
    issue: '',
    serviceType: '',
    preferredTime: '',
    notes: '',
    urgency: intent === 'emergency' ? 'emergency' : 'routine',
    intent,
    askedFollowUp: false,
  };
}
