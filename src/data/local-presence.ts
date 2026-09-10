/**
 * Owner-facing local presence kit (GBP, citations, reviews).
 * Rendered on /local-presence/ (noindex). Do not invent live profile URLs.
 */

import { siteConfig } from '../config/site';

export const gbpEligibilityGate = {
  title: 'Eligibility gate (read first)',
  rules: [
    'Google Business Profile is free to create or claim at https://business.google.com/add',
    'Plumbers that visit customers can qualify as service-area businesses.',
    'Lead-generation-only / online-only businesses that never make in-person contact are not eligible.',
    'If “Virginia Beach Plumbing” is only a website brand and not a real operating plumbing business that visits customers, do not create a profile.',
    'The business owner should own the profile. Do not create duplicates.',
    'Do not use a virtual office, mailbox, or fake storefront address to rank.',
  ],
};

export const gbpSetupSteps = [
  'Sign in with the business owner Google account at https://business.google.com/add',
  `Business name: use exactly “${siteConfig.brandName}” (no keyword stuffing)`,
  'Primary category: Plumber (verify the current Google category list; do not stuff extras)',
  'Secondary categories: only if truly accurate (examples to consider: Drain Cleaning Service, Water Heater Installation / Repair Service). Skip any that do not apply.',
  'Customers visit you? Answer No if this is a pure service-area plumber (no public storefront).',
  'Service area: Virginia Beach, VA only (and only other cities you actually serve). Do not add random cities.',
  `Phone: ${siteConfig.phoneDisplay} unless a verified authoritative number replaces it site-wide first`,
  'Website: use the final custom domain once live; until then the current production URL may be temporary',
  'Hours: Open 24/7 only if that is genuinely true',
  'Complete Google verification (postcard, phone, email, or video as offered). Do not fake evidence.',
];

export const gbpDescription = `${siteConfig.brandName} provides residential and commercial plumbing help in Virginia Beach, Virginia. We handle emergency leaks and backups, drain cleaning, sewer line work, water heater repair and replacement, tankless service, leak detection, slab leaks, fixture repairs, gas line work, backflow testing, and sump pumps. Call ${siteConfig.phoneDisplay}. We are open 24/7 for urgent plumbing problems. We come to you across Virginia Beach.`;

export const gbpServices = [
  { name: 'Emergency Plumbing', blurb: 'Burst pipes, major leaks, and sewer backups when the problem cannot wait.' },
  { name: 'Drain Cleaning', blurb: 'Clogged sinks, showers, tubs, and main-line clearing with the right method.' },
  { name: 'Sewer Line Repair', blurb: 'Inspection, repair, and replacement options for failing sewer laterals.' },
  { name: 'Trenchless Sewer Repair', blurb: 'Less-invasive options when pipe condition allows.' },
  { name: 'Water Heater Repair', blurb: 'Tank water heater diagnosis and repair.' },
  { name: 'Water Heater Replacement', blurb: 'Like-for-like and upgrade tank replacements.' },
  { name: 'Tankless Water Heater Service', blurb: 'Install, conversion assessment, and tankless repair.' },
  { name: 'Leak Detection', blurb: 'Find hidden supply-line and pipe leaks before damage spreads.' },
  { name: 'Slab Leak Repair', blurb: 'Under-slab leak detection and repair options.' },
  { name: 'Plumbing Repairs', blurb: 'Toilets, faucets, disposals, and fixture repairs.' },
  { name: 'Repiping', blurb: 'Whole-home and galvanized pipe replacement.' },
  { name: 'Gas Line Services', blurb: 'Gas line repair and installation with safety-first protocol.' },
  { name: 'Backflow Testing', blurb: 'Testing and preventer work when required.' },
  { name: 'Sump Pump Services', blurb: 'Installation, repair, and maintenance.' },
  { name: 'Residential Plumbing', blurb: 'Home and rental plumbing service.' },
  { name: 'Commercial Plumbing', blurb: 'Business, restaurant, office, and property-manager plumbing help.' },
];

export const verificationChecklist = [
  'Real operating location evidence (neighborhood landmarks/street signs near the private business address used for verification)',
  'Tools, equipment, or stocked service vehicle that belong to the business',
  'Proof of management (invoice, permit, utility bill, or branded assets matching the profile name)',
  'One continuous, unedited, live mobile video if Google requests video verification',
  'No empty lots, stock footage, or borrowed locations',
  'Do not show sensitive personal documents beyond what Google asks for',
];

export const photoChecklist = [
  { fileHint: 'team-or-technician.jpg', note: 'Real technician or team (with permission)' },
  { fileHint: 'service-vehicle.jpg', note: 'Real branded or work vehicle' },
  { fileHint: 'tools-equipment.jpg', note: 'Real tools / camera / jetter / heater equipment' },
  { fileHint: 'job-work.jpg', note: 'Real completed work (customer permission)' },
  { fileHint: 'before-after.jpg', note: 'Honest before/after pairs only' },
  { fileHint: 'uniform-branding.jpg', note: 'Uniforms or branded materials if they exist' },
];

export const reviewRequestTemplates = {
  sms: `Hi {{name}}, thanks for trusting ${siteConfig.brandName}. If the visit went well, a short Google review helps other Virginia Beach neighbors find us: {{review_url}}`,
  emailSubject: `Thanks from ${siteConfig.brandName}`,
  emailBody: `Hi {{name}},

Thanks for having us out for {{job_summary}}. If you were happy with the work, a brief Google review is the most helpful way to share that.

{{review_url}}

If anything still needs attention, reply to this message or call ${siteConfig.phoneDisplay}.

— ${siteConfig.brandName}`,
  timing: 'Ask after the job is complete and the customer confirms they are satisfied. Do not gate reviews. Do not write fake reviews.',
};

export const reviewResponseTemplates = {
  positive: `Thank you, {{name}}. We appreciate you taking the time. Glad we could help with {{job_summary}}.`,
  neutral: `Thanks for the feedback, {{name}}. If anything about the visit still feels unresolved, call ${siteConfig.phoneDisplay} and ask for a follow-up.`,
  complaint: `{{name}}, sorry the experience fell short. Please call ${siteConfig.phoneDisplay} so we can review what happened and make it right where we can.`,
  pricing: `{{name}}, thanks for saying something. Plumbing scope can change once we see access and parts. Call ${siteConfig.phoneDisplay} if you want us to walk through the invoice line by line.`,
  spam: `This does not appear to describe a real visit with our company. Please contact Google if you believe the review is fake or abusive.`,
};

export const citationTargets = [
  { directory: 'Google Business Profile', url: 'https://business.google.com/add', eligibility: 'Required if eligible', status: 'Owner action' },
  { directory: 'Bing Places', url: 'https://www.bingplaces.com/', eligibility: 'Free business listing', status: 'After GBP' },
  { directory: 'Apple Business Connect', url: 'https://businessconnect.apple.com/', eligibility: 'If Apple shows the business', status: 'After GBP' },
  { directory: 'Yelp for Business', url: 'https://biz.yelp.com/', eligibility: 'Real operating business', status: 'Owner action' },
  { directory: 'BBB', url: 'https://www.bbb.org/', eligibility: 'If you choose to accredit/list', status: 'Optional' },
  { directory: 'Virginia Beach Chamber / local civic orgs', url: 'https://www.vbchamber.com/', eligibility: 'Membership may be required', status: 'Optional' },
  { directory: 'Hampton Roads Chamber', url: 'https://www.hrchamber.com/', eligibility: 'Membership may be required', status: 'Optional' },
  { directory: 'Manufacturer / supplier dealer locators', url: '(brand-specific)', eligibility: 'Only if you are an authorized dealer', status: 'If applicable' },
  { directory: 'Angi / HomeAdvisor', url: 'https://www.angi.com/', eligibility: 'Optional paid lead networks', status: 'Business decision' },
];

export const searchConsoleSteps = [
  'Buy/connect the final custom domain and set PUBLIC_SITE_URL on Vercel',
  'Add a Domain property in Google Search Console for that domain',
  'Verify via DNS TXT (preferred) or the method Google offers',
  'Submit https://YOUR-DOMAIN/sitemap.xml',
  'Also add Bing Webmaster Tools with the same sitemap (free)',
  'Watch Pages report for crawled-not-indexed, canonical conflicts, and 404s',
];

export const rankingMonitorTemplate = [
  { field: 'week_of', note: 'ISO week start date' },
  { field: 'query', note: 'Exact search phrase checked' },
  { field: 'device', note: 'mobile or desktop' },
  { field: 'location_context', note: 'Searcher city / approximate area (not a guarantee of Map Pack)' },
  { field: 'organic_url', note: 'Which of our URLs appeared, if any' },
  { field: 'organic_position', note: 'Observed position or not visible' },
  { field: 'map_pack', note: 'yes / no / unknown' },
  { field: 'notes', note: 'Competitor names, PAA themes, snippet issues' },
];

export const intentMap = [
  { intent: 'plumber Virginia Beach', url: '/', notes: 'Homepage primary' },
  { intent: 'emergency / 24 hour plumber', url: '/emergency-plumber/', notes: 'Money page' },
  { intent: 'plumbing services', url: '/plumbing-services/', notes: 'Hub' },
  { intent: 'drain cleaning / clogged drain', url: '/drain-cleaning/', notes: 'Money page' },
  { intent: 'drain keeps clogging', url: '/resources/recurring-drain-clogs/', notes: 'Problem → drain' },
  { intent: 'hydro jetting', url: '/resources/hydro-jetting-vs-snaking/', notes: 'Guide under drain cluster' },
  { intent: 'sewer line repair', url: '/sewer-line-repair/', notes: 'Money page' },
  { intent: 'sewer backup', url: '/resources/sewer-backup/', notes: 'Problem → emergency/sewer' },
  { intent: 'water heater repair/replace', url: '/water-heaters/', notes: 'Tank focus' },
  { intent: 'tankless water heater', url: '/tankless-water-heaters/', notes: 'Separate money page' },
  { intent: 'no hot water', url: '/resources/no-hot-water/', notes: 'Problem guide' },
  { intent: 'leaking water heater', url: '/resources/water-heater-leaking/', notes: 'Problem guide' },
  { intent: 'leak detection', url: '/leak-detection/', notes: 'Money page' },
  { intent: 'slab leak', url: '/slab-leak-repair/', notes: 'Money page' },
  { intent: 'foul drain smell / sewer odor', url: '/resources/foul-drain-odor/', notes: 'Problem → drain/sewer' },
  { intent: 'clogged toilet', url: '/resources/clogged-toilet/', notes: 'Problem → repairs' },
  { intent: 'running toilet', url: '/resources/running-toilet/', notes: 'Problem guide' },
  { intent: 'commercial plumber', url: '/commercial-plumbing/', notes: 'Audience page' },
  { intent: 'residential plumber', url: '/residential-plumbing/', notes: 'Audience page' },
];
