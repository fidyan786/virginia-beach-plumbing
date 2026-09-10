# Local citations & entity building — Virginia Beach Plumbing

Quality over quantity. No spam directories, no fake NAP, no purchased junk links.

**NAP to keep consistent**

- Name: Virginia Beach Plumbing  
- Phone: (703) 703-7855 (until replaced site-wide with an authorized number)  
- Website: custom domain when ready; else current Vercel production URL  
- Address: service-area only (no invented storefront)

## Recommended platforms

| Platform | URL | Priority | Why | Info required | Owner auth? | Action | Status |
|----------|-----|----------|-----|---------------|-------------|--------|--------|
| Google Business Profile | https://business.google.com/add | P0 | Local Pack / Maps | Name, phone, services, area, hours, website | Yes | See `research/gbp-setup.md` | OWNER ACTION |
| Bing Places | https://www.bingplaces.com/ | P1 | Bing/Maps entity | Same NAP + category | Yes | Create after GBP; match NAP exactly | OWNER ACTION |
| Apple Business Connect | https://businessconnect.apple.com/ | P1 | Apple Maps | Same NAP | Yes | Claim/create after GBP exists | OWNER ACTION |
| Yelp for Business | https://biz.yelp.com/ | P2 | Consumer discovery | NAP + categories | Yes | Claim only if real operating business | OWNER ACTION |
| BBB | https://www.bbb.org/ | P3 | Trust (optional) | Legal entity details | Yes | Only if owner chooses accreditation | OPTIONAL |
| Virginia Beach Chamber | https://www.vbchamber.com/ | P3 | Local authority | Membership | Yes | Join only if strategic | OPTIONAL |
| Hampton Roads Chamber | https://www.hrchamber.com/ | P3 | Regional authority | Membership | Yes | Join only if strategic | OPTIONAL |
| Manufacturer dealer locators | Brand-specific | P2 | Relevant only if authorized | Dealer proof | Yes | Add only with real authorization | OWNER / IF TRUE |
| Angi / similar networks | Platform sites | P3 | Leads (paid) | Business decision | Yes | Optional paid channel, not “SEO spam” | BUSINESS DECISION |

## Submission rules

1. Use identical name/phone/website every time.
2. Do not publish a fake street address for ranking.
3. Do not create duplicate listings.
4. Skip low-quality “submit to 500 directories” services.
5. Prefer platforms real customers use.

## Tracking sheet columns

Directory | URL | Name | Phone | Website | Address/service area | Category | Login owner | Submitted | Verified | Notes

Do not store passwords in the repo.

## Code already prepared

- Entity fields in `src/config/site.ts`
- Schema without fake ratings/address
- `/local-presence/` checklist (noindex)
- After real GBP URLs exist: fill `googleBusinessProfile.*` so schema `sameAs` and contact review CTA activate
