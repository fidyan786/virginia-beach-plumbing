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
  /** Production origin. Prefer this over editing canonical URLs in templates. */
  readonly PUBLIC_SITE_URL?: string;
  readonly SITE_URL?: string;
  /**
   * Optional NAP overrides. Leave unset to use the operator-provided number
   * in src/config/site.ts. Do not invent a 757 (or any) replacement here.
   */
  readonly PUBLIC_PHONE_DISPLAY?: string;
  readonly PUBLIC_PHONE_TEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
