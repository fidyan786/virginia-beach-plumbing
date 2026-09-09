# Virginia Beach Plumbing Website

Production Astro SSG site for Rank & Rent local plumbing lead generation.

## Quick start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Business config

Edit `src/config/site.ts`:

- Brand: Virginia Beach Plumbing
- Phone: (703) 703-7855 (`tel:+17037037855`)
- Hours: Open 24/7
- Area: Serving Virginia Beach, VA (no fabricated street address)

Still optional before full launch: GA4 ID, form endpoint, canonical domain in `astro.config.mjs`.

## AI phone receptionist

Inbound calling is implemented in `../voice` (separate Node service). It is **not live** until Twilio (or another telephony provider), a public webhook URL, and lead-notification credentials are configured and tested. Point `formEndpoint` / `chat.leadEndpoint` at that service’s `/api/leads` so website chat, forms, and phone share one pipeline.

See `research/21-ai-phone-receptionist.md`.

## Structure

- `src/pages/` — routes
- `src/components/` — layout UI
- `src/data/` — service + resource content
- `public/images/` — optimized illustrative plumbing imagery
