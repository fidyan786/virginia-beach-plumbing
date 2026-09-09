import type { ChatAction, ChatIntent, LeadDraft, PublicChatConfig } from './types';
import type { CustomerType } from '../leads/schema';
import { formatPhone, isValidPhone, phoneDigits } from './validate';

export function telHref(cfg: PublicChatConfig): string {
  return `tel:+1${cfg.phoneTel}`;
}

export function callAction(cfg: PublicChatConfig, id = 'call'): ChatAction {
  return {
    id,
    label: `Call ${cfg.phoneDisplay}`,
    type: 'tel',
    href: telHref(cfg),
  };
}

export function callNowAction(cfg: PublicChatConfig): ChatAction {
  return { id: 'call', label: 'Call Now', type: 'tel', href: telHref(cfg) };
}

export function welcomeActions(cfg: PublicChatConfig): ChatAction[] {
  return [
    { id: 'emergency', label: 'Emergency Plumbing', type: 'quick' },
    { id: 'service', label: 'Request Service', type: 'quick' },
    { id: 'quote', label: 'Get a Quote', type: 'quick' },
    { id: 'question', label: 'Plumbing Questions', type: 'quick' },
    { id: 'call', label: 'Call Now', type: 'tel', href: telHref(cfg) },
  ];
}

export function serviceOfferActions(cfg: PublicChatConfig): ChatAction[] {
  return [
    { id: 'service', label: 'Request Service', type: 'quick' },
    callAction(cfg),
  ];
}

export function emergencyActions(cfg: PublicChatConfig): ChatAction[] {
  return [
    { id: 'call-emergency', label: 'Call Now', type: 'tel', href: telHref(cfg) },
    { id: 'emergency-callback', label: 'Request a callback', type: 'quick' },
  ];
}

export const WELCOME_TEXT =
  "Hi — this is the Virginia Beach Plumbing assistant. We're open 24/7. How can we help today?";

export interface ServiceHint {
  intent: ChatIntent;
  keywords: string[];
  service: string;
  serviceKey: string;
  reply: string;
  followUp: string;
}

export const SERVICE_HINTS: ServiceHint[] = [
  {
    intent: 'emergency',
    keywords: ['burst', 'flood', 'flooding', 'gushing', 'water everywhere', 'sewage in', 'sewer backup', 'overflowing', 'major leak', 'leaking badly'],
    service: 'emergency plumbing',
    serviceKey: 'burst_pipe',
    reply: "That sounds like it may need urgent attention. If water is actively flooding, shut off the main water supply if you can do so safely.",
    followUp: '',
  },
  {
    intent: 'service',
    keywords: ['clog', 'slow drain', 'stopped up', 'backed up', 'backing up', 'backed up sink', 'hair clog', 'kitchen drain', 'kitchen sink', 'shower drain', 'drain cleaning'],
    service: 'drain cleaning',
    serviceKey: 'drain_cleaning',
    reply: "Got it — a clogged drain is pretty common.",
    followUp: "Is it one drain that's clogged, or are multiple drains backing up?",
  },
  {
    intent: 'service',
    keywords: ['sewer', 'main line', 'roots in pipe', 'yard wet', 'sewage smell', 'toilet gurgle'],
    service: 'sewer line repair',
    serviceKey: 'sewer_line',
    reply: "Okay, that could be a sewer-line issue — I won't guess from chat, but we can help get it looked at.",
    followUp: 'Are multiple drains backing up, or are you mainly noticing slow drainage?',
  },
  {
    intent: 'quote',
    keywords: ['trenchless', 'cipp', 'pipe bursting', 'lining'],
    service: 'trenchless sewer repair',
    serviceKey: 'sewer_line',
    reply: "Trenchless can be a fit when the existing pipe is a good host. Camera findings decide that — digging is sometimes the honest option.",
    followUp: 'Has anyone already run a camera on the line, or would this be a first look?',
  },
  {
    intent: 'service',
    keywords: ['no hot water', 'water heater', 'tankless', 'lukewarm'],
    service: 'water heater',
    serviceKey: 'water_heater',
    reply: "Got it. Water heater trouble is something we handle in Virginia Beach.",
    followUp: 'Are you getting no hot water, or is it just not staying hot?',
  },
  {
    intent: 'service',
    keywords: ['leak', 'dripping', 'water stain', 'high water bill', 'under sink', 'hidden leak', 'leaking'],
    service: 'leak detection',
    serviceKey: 'leak_detection',
    reply: "Okay, that sounds frustrating. A leak can be obvious or hidden.",
    followUp: 'Do you know where the leak is coming from, or is the source hard to find?',
  },
  {
    intent: 'service',
    keywords: ['slab leak', 'under the slab', 'under floor leak', 'warm spot on floor'],
    service: 'slab leak repair',
    serviceKey: 'slab_leak',
    reply: "A possible slab leak needs proper detection — those clues help, but they aren't a diagnosis on their own.",
    followUp: 'Are you seeing a warm spot on the floor, a spike in the water bill, or both?',
  },
  {
    intent: 'service',
    keywords: ['repipe', 'repiping', 'galvanized', 'whole house pipes', 'old pipes', 'polybutylene'],
    service: 'repiping',
    serviceKey: 'repiping',
    reply: "Repiping is a planned job when pipes are failing or at end of life. We'd quote after looking at the system — not from chat.",
    followUp: 'Is this for the whole house, or just a section of piping?',
  },
  {
    intent: 'service',
    keywords: ['sump', 'basement pump', 'crawl space pump'],
    service: 'sump pump',
    serviceKey: 'sump_pump',
    reply: 'Sure — we can help with sump pumps.',
    followUp: 'Is the pump not kicking on, or is the basement already taking on water?',
  },
  {
    intent: 'service',
    keywords: ['backflow', 'preventer', 'backflow test'],
    service: 'backflow testing',
    serviceKey: 'backflow',
    reply: "Backflow testing is usually a scheduled visit. We can take a request.",
    followUp: 'Is this for a home or a business, and do you have a deadline?',
  },
  {
    intent: 'service',
    keywords: ['gas line', 'gas stove', 'gas dryer', 'gas range', 'gas pipe'],
    service: 'gas line services',
    serviceKey: 'gas_line',
    reply: 'Gas line work is safety-first.',
    followUp: '',
  },
  {
    intent: 'service',
    keywords: ['commercial', 'restaurant', 'grease', 'office', 'hotel', 'apartment', 'property manager'],
    service: 'commercial plumbing',
    serviceKey: 'commercial_plumbing',
    reply: 'We handle commercial plumbing for kitchens, offices, hospitality, and property managers in Virginia Beach.',
    followUp: "What's going on at the property?",
  },
  {
    intent: 'service',
    keywords: ['toilet', 'running toilet', "won't flush", 'wont flush', 'fill valve', 'clogged toilet', 'garbage disposal', 'disposal jammed'],
    service: 'plumbing repairs',
    serviceKey: 'toilet',
    reply: 'Okay — toilets, faucets, and disposals are common repair calls.',
    followUp: 'Is it a toilet, a faucet, or a garbage disposal — and is water overflowing?',
  },
  {
    intent: 'service',
    keywords: ['low pressure', 'no water', 'weak shower', 'water pressure', 'faucet', 'fixture'],
    service: 'plumbing repairs',
    serviceKey: 'fixture_repair',
    reply: 'Got it. That can be a fixture issue or something farther back in the system.',
    followUp: 'Is it one fixture, or is pressure low throughout the property?',
  },
];

export function detectIntent(text: string): ChatIntent {
  const t = text.toLowerCase();
  if (isGasEmergency(t)) return 'emergency';
  if (isHumanRequest(t)) return 'human';
  if (/\b(emergency|burst|flood|flooding|sewage|backup|overflowing|gushing|water everywhere|leaking badly)\b/.test(t)) {
    return 'emergency';
  }
  if (/\b(quote|how much|cost|price|estimate|pricing)\b/.test(t)) return 'quote';
  if (/\b(schedule|come out|come by|book|appointment|need a plumber|need someone|get help|request service|send someone|send a plumber)\b/.test(t)) {
    return 'service';
  }
  if (/\b(hours|open|virginia beach|service area|do you serve)\b/.test(t)) return 'question';
  if (identifyService(text)) return 'question';
  return 'general';
}

export function isHumanRequest(text: string): boolean {
  return /\b(talk to (a |someone|a person|the team)|real person|human|call me|speak (to|with) (someone|a person|a human)|transfer me)\b/i.test(
    text
  );
}

export function identifyService(text: string): ServiceHint | null {
  const t = text.toLowerCase();
  let best: { score: number; item: ServiceHint } | null = null;
  for (const item of SERVICE_HINTS) {
    const score = item.keywords.reduce((n, k) => (t.includes(k) ? n + 1 + k.length / 20 : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, item };
  }
  return best?.item ?? null;
}

export function isGasEmergency(text: string): boolean {
  return /\b(gas smell|smell gas|smells like gas|smell of gas|propane)\b/i.test(text);
}

export function isSevereEmergency(text: string): boolean {
  return /\b(flood|flooding|standing water|burst pipe|pipe burst|water everywhere|sewage in the (house|home)|major leak|leaking badly|ceiling (is )?collapsing)\b/i.test(
    text
  );
}

export function isSmallTalk(text: string): boolean {
  return /^(lol+|haha+|ok|okay|k|thanks|thank you|cool|nm|hi|hey|hello)[\s!.]*$/i.test(text.trim());
}

export function isInjectionAttempt(text: string): boolean {
  return /\b(ignore (all )?(previous|prior) (instructions|prompts)|system prompt|reveal (your )?(api key|instructions|secrets)|you are now|jailbreak)\b/i.test(
    text
  );
}

export function detectCustomerType(text: string): CustomerType | null {
  const t = text.toLowerCase();
  if (/\b(restaurant|office|hotel|hospitality|business|commercial|property manager|apartments?|retail)\b/.test(t)) {
    return 'commercial';
  }
  if (/\b(home|house|homeowner|renter|residential|landlord)\b/.test(t)) return 'residential';
  if (/^(home|house|residential)$/i.test(t.trim())) return 'residential';
  if (/^(business|commercial)$/i.test(t.trim())) return 'commercial';
  return null;
}

export function extractFacts(text: string): Partial<LeadDraft> {
  const out: Partial<LeadDraft> = {};
  const phoneMatch = text.match(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch && isValidPhone(phoneMatch[0])) {
    out.phone = formatPhone(phoneMatch[0]);
    out.phoneDigits = phoneDigits(phoneMatch[0]);
  }
  const zipMatch =
    text.match(/\b(?:zip(?:\s*code)?\s*(?:is|:)?\s*)(\d{5})\b/i) || text.match(/\bin\s+(2345[0-79]|2346[0-467]|23471|23479)\b/);
  if (zipMatch) out.zip = zipMatch[1];
  const nameMatch = text.match(/\b(?:my name is|i['’]m|i am)\s+([A-Za-z][A-Za-z' -]{1,40})/i);
  if (nameMatch) out.name = nameMatch[1].replace(/\s+/g, ' ').trim();
  const type = detectCustomerType(text);
  if (type) out.customerType = type;
  const timeMatch = text.match(
    /\b(as soon as possible|asap|this morning|this afternoon|tonight|after \d+|tomorrow|next week|today)\b/i
  );
  if (timeMatch) out.preferredTime = timeMatch[1];
  const identified = identifyService(text);
  if (identified && identified.intent !== 'emergency') {
    out.issue = text.replace(/\s+/g, ' ').trim();
    out.serviceType = identified.serviceKey;
  }
  return out;
}

export function mergeFacts(lead: LeadDraft, facts: Partial<LeadDraft>): LeadDraft {
  return {
    ...lead,
    name: lead.name || facts.name || '',
    phone: lead.phone || facts.phone || '',
    phoneDigits: lead.phoneDigits || facts.phoneDigits || '',
    zip: lead.zip || facts.zip || '',
    address: lead.address || facts.address || '',
    customerType: lead.customerType !== 'unknown' ? lead.customerType : facts.customerType || 'unknown',
    issue: lead.issue || facts.issue || '',
    serviceType: lead.serviceType || facts.serviceType || '',
    preferredTime: lead.preferredTime || facts.preferredTime || '',
    notes: lead.notes,
    urgency: facts.urgency || lead.urgency,
    intent: lead.intent,
    askedFollowUp: lead.askedFollowUp,
  };
}

export function detectCorrection(
  text: string
): { field: 'name' | 'phone' | 'zip' | 'preferredTime' | 'issue'; value?: string } | null {
  const t = text.toLowerCase();
  if (/\b(change|update|correct|different).*(number|phone)|number is different|new number\b/.test(t)) {
    const phoneMatch = text.match(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    return { field: 'phone', value: phoneMatch?.[0] };
  }
  if (/\b(change|update).*(zip|time|name|issue|preferred)\b/.test(t) || /\bchange my preferred time\b/.test(t)) {
    if (/\bzip\b/.test(t)) return { field: 'zip' };
    if (/\btime\b/.test(t)) return { field: 'preferredTime' };
    if (/\bname\b/.test(t)) return { field: 'name' };
    if (/\bissue|problem\b/.test(t)) return { field: 'issue' };
    if (/\bphone|number\b/.test(t)) return { field: 'phone' };
  }
  return null;
}

export function topicShiftService(text: string): ServiceHint | null {
  if (!/\b(actually|never mind|nevermind|wait|instead)\b/i.test(text)) return null;
  return identifyService(text);
}

export function hoursReply(cfg: PublicChatConfig): string {
  return `Yep — we're ${cfg.hoursDisplay.toLowerCase()} for plumbing help, including emergencies. Call ${cfg.phoneDisplay}.`;
}

export function areaReply(cfg: PublicChatConfig): string {
  return `We serve ${cfg.serviceArea} — places like Oceanfront, Kempsville, Lynnhaven, Town Center, and Princess Anne. If you're outside the city, say so and I'll tell you whether we can take the job.`;
}

export function pricingReply(): string {
  return "Pricing depends on what's causing the problem and how much work is needed. I can't quote a price in chat. I can take a few details and help start a service request.";
}

export function humanReply(cfg: PublicChatConfig): string {
  return `The fastest option is to call ${cfg.phoneDisplay}. We're open 24/7.`;
}

export function gasSafetyReply(cfg: PublicChatConfig): string {
  return `If you smell gas, leave immediately. Don't use lights, phones, or switches inside. From a safe place, call the gas utility or 911. After the area is safe, you can call us at ${cfg.phoneDisplay}. I won't diagnose a gas leak from chat.`;
}

export function severeEmergencyReply(cfg: PublicChatConfig): string {
  return `That sounds like it may need urgent attention. If water is actively flooding the area, shut off the main water supply if you can do so safely. For immediate help, call ${cfg.phoneDisplay} — we're open 24/7.`;
}

export function answerQuestion(text: string, cfg: PublicChatConfig): string {
  const t = text.toLowerCase();

  if (isGasEmergency(t)) return gasSafetyReply(cfg);
  if (/\b(911|fire department|carbon monoxide|co alarm)\b/.test(t)) {
    return "If anyone's in danger, call 911. For a gas smell, leave and contact the gas utility or emergency services from a safe place before calling a plumber.";
  }
  if (/\b(hour|open|24\/7|after hours|weekend|night)\b/.test(t)) return hoursReply(cfg);
  if (/\b(where are you|address|service area|do you serve|virginia beach|kempsville|oceanfront)\b/.test(t)) {
    return areaReply(cfg);
  }
  if (/\b(how much|cost|price|quote|estimate|discount|coupon)\b/.test(t)) return pricingReply();
  if (/\b(license|insured|certified|review|rating|employees|guarantee|warranty)\b/.test(t)) {
    return `I don't list licenses, reviews, or guarantees here. Call ${cfg.phoneDisplay} and we can talk through the job, or start a service request.`;
  }
  if (/\b(city|public utilities|municipal|street flooding|water main)\b/.test(t)) {
    return `Street flooding or city-side water/sewer issues may belong to Virginia Beach Public Utilities (${cfg.cityUtilitiesEmergencyPhone}). Indoor plumbing and private laterals are usually the property owner's. If you're unsure, call ${cfg.phoneDisplay} and we can help sort it.`;
  }
  if (/\b(shut off|main valve|water valve|what should i do)\b/.test(t)) {
    return "If water's running and it's safe, shut off the fixture stop or the home's main valve. Keep people and electricity away from standing water. Then call us — we're open 24/7.";
  }

  const identified = identifyService(text);
  if (identified) {
    return identified.followUp ? `${identified.reply} ${identified.followUp}` : identified.reply;
  }

  return "I want to make sure I point you in the right direction. Is this mainly a leak, clog, water heater problem, or something else?";
}

export function applySafetyToReply(text: string): string {
  let out = text;
  out = out.replace(
    /\b(we('ve| have)? dispatched|tech(nician)? is on the way|eta is \d+)\b/gi,
    "a technician hasn't been dispatched yet"
  );
  out = out.replace(/\$\s?\d[\d,]*(?:\.\d+)?/g, 'a job-specific quote');
  return out;
}

export function leadVariant(intent: ChatIntent): 'chat_emergency' | 'chat_service' | 'chat_quote' {
  if (intent === 'emergency') return 'chat_emergency';
  if (intent === 'quote') return 'chat_quote';
  return 'chat_service';
}

export function alreadyAnsweredFollowUp(hint: ServiceHint, text: string): boolean {
  const t = text.toLowerCase();
  if (hint.serviceKey === 'drain_cleaning' && /\b(one drain|multiple drains|completely blocked|completely clogged)\b/.test(t)) {
    return true;
  }
  if (hint.serviceKey === 'water_heater' && /\b(no hot water|completely cold|some hot|not staying hot)\b/.test(t) && /\b(heater|hot water)\b/.test(t)) {
    return true;
  }
  return false;
}
