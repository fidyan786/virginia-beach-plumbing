/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Server-only AI provider: none | openai | anthropic */
  readonly CHAT_AI_PROVIDER?: string;
  readonly CHAT_AI_API_KEY?: string;
  readonly CHAT_AI_MODEL?: string;
  readonly CHAT_AI_ENDPOINT?: string;
  readonly LEAD_WEBHOOK_URL?: string;
  /** Recommended: URL of the voice receptionist POST /api/leads */
  readonly VOICE_LEADS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
