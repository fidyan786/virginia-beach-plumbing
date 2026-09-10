# Google Business Profile setup — Virginia Beach Plumbing

Owner-facing. Do not invent missing facts. Create/claim only if the business is legitimately eligible.

Official start: https://business.google.com/add (free)

## Eligibility (hard gate)

Eligible only if this is a real plumbing business that makes in-person contact with customers (service-area plumbers qualify).

**Not eligible:** lead-generation-only / online-only brands with no real visits.

If ineligible: **do not create a GBP.** Stop here.

## Recommended configuration

| Field | Recommendation | Source / notes |
|--------|----------------|----------------|
| Business name | `Virginia Beach Plumbing` exactly | `siteConfig.brandName` — no keyword stuffing |
| Profile type | Service-area business (hide public address) | Site has no public storefront |
| Primary category | **Plumber** | Verify in Google’s current category list |
| Secondary categories (only if true) | Drain Cleaning Service; Water Heater Installation / Repair Service; Sewer Service / related if offered; Emergency Plumber **only if Google still lists it and it fits** | Skip anything not genuinely offered |
| Phone | `(703) 703-7855` | Keep until owner authorizes a different number site-wide |
| Website | Final custom domain when live | Temporary: `https://website-self-nine-84.vercel.app/` |
| Hours | Open 24/7 **only if true** | Matches current site config; change site + GBP together if false |
| Service area | Virginia Beach, VA (+ only cities actually served) | Up to 20 areas by city/ZIP — no radius; no fake expansion |
| Address | Private for verification only; **do not show** if customers never visit | No virtual office / mailbox storefront |

## Services to add (match site / real offering)

Emergency Plumbing, Drain Cleaning, Sewer Line Repair, Trenchless Sewer Repair, Water Heater Repair, Water Heater Replacement, Tankless Water Heater Service, Leak Detection, Slab Leak Repair, Plumbing Repairs, Repiping, Gas Line Services, Backflow Testing, Sump Pump Services, Residential Plumbing, Commercial Plumbing.

Write short plain descriptions. Do not keyword-stuff every line with “Virginia Beach.”

## Business description (draft — edit if facts differ)

Virginia Beach Plumbing provides residential and commercial plumbing help in Virginia Beach, Virginia. We handle emergency leaks and backups, drain cleaning, sewer line work, water heater repair and replacement, tankless service, leak detection, slab leaks, fixture repairs, gas line work, backflow testing, and sump pumps. Call (703) 703-7855. We are open 24/7 for urgent plumbing problems. We come to you across Virginia Beach.

## Already available in the website project

- Brand name, phone, 24/7 hours claim (from config)
- Service list and URLs
- Neighborhood context (not doorway pages)
- Schema: Plumber / PlumbingContractor / LocalBusiness (city/state only, no street, no fake ratings)
- Owner kit: `/local-presence/` (noindex)
- Config hooks: `siteConfig.googleBusinessProfile.profileUrl` / `reviewUrl` / `mapsUrl`

## Missing (OWNER ACTION)

- Confirmation of eligibility and real operating identity
- Owner Google account login + verification (postcard / phone / email / video)
- Real photos (team, vehicle, tools, jobs)
- Real Google reviews after completed jobs
- License / insurance numbers if they should appear on site or GBP
- Custom domain for permanent website field
- Paste verified GBP / Maps / review URLs into `src/config/site.ts` after go-live

## Verification evidence (if Google asks for video)

Live, unedited recording showing: neighborhood landmarks near the private business base, tools/vehicle, proof of management (invoice/permit/utility matching the profile name). Do not fake locations or signage.

## Exact owner steps

1. Confirm eligibility.
2. Sign in as owner at https://business.google.com/add
3. Search for an existing listing before creating a duplicate.
4. Enter exact name → Plumber → no public address if SAB → service area Virginia Beach.
5. Enter phone, website, hours, services, description.
6. Complete verification.
7. Upload real photos; never use stock as “our job.”
8. After verification, paste profile + review URLs into site config and redeploy.
9. Request reviews only after real completed jobs; respond to every review.
