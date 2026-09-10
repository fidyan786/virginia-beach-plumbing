/**
 * Site configuration — Virginia Beach Plumbing
 * Phone and hours provided by operator. No fabricated address, email, licenses, or reviews.
 */

export const siteConfig = {
  brandName: 'Virginia Beach Plumbing',
  legalName: 'Virginia Beach Plumbing',
  phoneDisplay: '(703) 703-7855',
  phoneTel: '7037037855',
  /** No verified email — omit from UI */
  email: '',
  /** No street address — service-area messaging only */
  addressLine1: '',
  addressLine2: 'Serving Virginia Beach, VA',
  serviceAreaPrimary: 'Virginia Beach, Virginia',
  serviceAreaNotes: 'Virginia Beach, Virginia',
  hoursDisplay: 'Open 24/7',
  emergencyAvailability: 'Open 24/7 for emergency plumbing help',
  /** Omit unverified credentials from UI */
  licenseDisplay: '',
  insuranceDisplay: '',
  neighborhoods: [
    'Oceanfront',
    'Kempsville',
    'Lynnhaven',
    'Town Center',
    'Princess Anne',
    'Great Neck',
    'Pungo',
    'Bayside',
    'Red Mill',
    'Sandbridge',
  ] as const,
  zipAllowlistPlaceholder: 'Virginia Beach area ZIP',
  cityUtilitiesEmergencyUrl:
    'https://www.vbgov.com/government/departments/public-utilities/',
  cityUtilitiesEmergencyPhone: '757-385-3111',
  analytics: {
    ga4MeasurementId: '[GA4_MEASUREMENT_ID — REQUIRED]',
    gtmContainerId: '[GTM_CONTAINER_ID — OPTIONAL]',
  },
  canonicalDomainNote: '[CANONICAL-DOMAIN — REQUIRED]',
  formEndpoint: '[FORM_ENDPOINT — REQUIRED]',
  /**
   * Chatbot integration — public URLs only.
   * Never put AI/provider API keys or webhook secrets here (they would ship to the browser).
   * Wire secrets in server env vars. Recommended production inbox is the voice
   * receptionist at ../voice (`POST /api/leads`) — set formEndpoint / leadEndpoint
   * to that origin once it is deployed. Do not treat placeholders as live.
   * If the website and voice service are on different hosts, set WEBSITE_ORIGIN
   * on the voice service (CORS). Do not put LEAD_INGEST_SECRET in this file.
   */
  chat: {
    /**
     * Optional AI reply endpoint (POST JSON).
     * Leave the placeholder to use the on-site plumbing assistant.
     * Expected contract: see `src/lib/chat/types.ts` (`ChatApiRequest` / `ChatApiResponse`).
     */
    chatEndpoint: '[CHAT_ENDPOINT — OPTIONAL]',
    /**
     * Optional dedicated lead URL. Empty string uses `formEndpoint`.
     * Same rule as the contact form: do not treat a placeholder as a live inbox.
     */
    leadEndpoint: '',
  },
  serviceGates: {
    trenchless: true,
    slabLeak: true,
    gasLine: true,
    backflow: true,
    sumpPump: true,
    hydroJetting: true,
  },
} as const;

export type ServiceSlug =
  | 'emergency-plumber'
  | 'drain-cleaning'
  | 'sewer-line-repair'
  | 'trenchless-sewer-repair'
  | 'water-heaters'
  | 'leak-detection'
  | 'slab-leak-repair'
  | 'commercial-plumbing'
  | 'repiping'
  | 'gas-line-services'
  | 'backflow-testing'
  | 'sump-pump'
  | 'residential-plumbing'
  | 'plumbing-repairs';

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/plumbing-services/' },
  { label: 'Emergency', href: '/emergency-plumber/', highlight: true },
  { label: 'Residential', href: '/residential-plumbing/' },
  { label: 'Commercial', href: '/commercial-plumbing/' },
  { label: 'Service Area', href: '/service-areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Six homepage feature cards — not a dump of every service. */
export const homepageServices: ServiceCard[] = [
  {
    title: 'Emergency Plumbing',
    href: '/emergency-plumber/',
    description: 'Burst pipes, major leaks, and sewer backups when the problem cannot wait.',
    priority: 'P0',
  },
  {
    title: 'Drain Cleaning',
    href: '/drain-cleaning/',
    description: 'Slow sinks, stubborn clogs, and main-line backups cleared with the right method.',
    priority: 'P0',
  },
  {
    title: 'Water Heaters',
    href: '/water-heaters/',
    description: 'Repair, replacement, and installation for tank and tankless systems.',
    priority: 'P0',
  },
  {
    title: 'Sewer Line Repair',
    href: '/sewer-line-repair/',
    description: 'Inspection, repair, and replacement options when a sewer line is failing.',
    priority: 'P0',
  },
  {
    title: 'Leak Detection',
    href: '/leak-detection/',
    description: 'Find hidden pipe and water-line leaks before damage has a chance to spread.',
    priority: 'P0',
  },
  {
    title: 'Plumbing Repairs',
    href: '/plumbing-repairs/',
    description: 'Toilets, faucets, disposals, and the fixture repairs that keep a home running.',
    priority: 'P1',
  },
];

export interface ServiceCard {
  title: string;
  href: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
  gated?: boolean;
  image?: string;
  imageAlt?: string;
}

export const p0Services: ServiceCard[] = [
  {
    title: 'Emergency Plumbing',
    href: '/emergency-plumber/',
    description: '24/7 help for burst pipes, major leaks, and sewer backups.',
    priority: 'P0',
    image: '/images/emergency-plumbing.jpg',
    imageAlt: 'Burst copper pipe in insulation (illustrative stock photo, not a company job)',
  },
  {
    title: 'Drain Cleaning',
    href: '/drain-cleaning/',
    description: 'Clogged drains, main lines, and clearing options when needed.',
    priority: 'P0',
    image: '/images/drain-cleaning.jpg',
    imageAlt: 'Under-sink drain pipes and supply lines (illustrative stock photo)',
  },
  {
    title: 'Sewer Line Repair',
    href: '/sewer-line-repair/',
    description: 'Camera inspection, repair, and replacement options.',
    priority: 'P0',
    image: '/images/sewer-inspection.jpg',
    imageAlt: 'Exposed sewer pipes in an excavated trench (illustrative stock photo)',
  },
  {
    title: 'Trenchless Sewer Repair',
    href: '/trenchless-sewer-repair/',
    description: 'Less-invasive sewer options when pipe condition allows.',
    priority: 'P0',
    image: '/images/trenchless.jpg',
    imageAlt: 'Plumber working on pipes in an opened floor trench (illustrative stock photo)',
  },
  {
    title: 'Water Heaters',
    href: '/water-heaters/',
    description: 'Repair, replacement, and installation for tank and tankless.',
    priority: 'P0',
    image: '/images/water-heater.jpg',
    imageAlt: 'Removed residential water heater tank (illustrative stock photo)',
  },
  {
    title: 'Leak Detection',
    href: '/leak-detection/',
    description: 'Find hidden pipe and water line leaks before damage spreads.',
    priority: 'P0',
    image: '/images/leak-detection.jpg',
    imageAlt: 'Kitchen faucet and sink for fixture and leak context (illustrative stock photo)',
  },
  {
    title: 'Slab Leak Repair',
    href: '/slab-leak-repair/',
    description: 'Detection and repair options for under-slab leaks.',
    priority: 'P0',
    image: '/images/slab-leak.jpg',
    imageAlt: 'PEX plumbing tools and fittings (illustrative stock photo)',
  },
  {
    title: 'Commercial Plumbing',
    href: '/commercial-plumbing/',
    description: 'Restaurants, offices, hospitality, and property managers.',
    priority: 'P0',
    image: '/images/commercial-plumbing.jpg',
    imageAlt: 'Building utility meters and piping (illustrative stock photo)',
  },
];

export const p1Services: ServiceCard[] = [
  {
    title: 'Repiping',
    href: '/repiping/',
    description: 'Whole-home and galvanized pipe replacement.',
    priority: 'P1',
    image: '/images/repiping.jpg',
    imageAlt: 'Brass push-fit plumbing fittings (illustrative stock photo)',
  },
  {
    title: 'Gas Line Services',
    href: '/gas-line-services/',
    description: 'Gas line repair and installation with safety-first protocol.',
    priority: 'P1',
    image: '/images/gas-line.jpg',
    imageAlt: 'Outdoor gas meters and piping (illustrative stock photo)',
  },
  {
    title: 'Backflow Testing',
    href: '/backflow-testing/',
    description: 'Testing and preventer work for compliance needs.',
    priority: 'P1',
    image: '/images/backflow.jpg',
    imageAlt: 'Disassembled brass valve components (illustrative stock photo)',
  },
  {
    title: 'Sump Pump Services',
    href: '/sump-pump/',
    description: 'Installation, repair, and maintenance.',
    priority: 'P1',
    image: '/images/sump-pump.jpg',
    imageAlt: 'Basement sump pump pit and discharge pipe (illustrative stock photo)',
  },
  {
    title: 'Plumbing Repairs',
    href: '/plumbing-repairs/',
    description: 'Toilets, faucets, garbage disposals, and fixture repairs.',
    priority: 'P1',
    image: '/images/plumbing-repairs.jpg',
    imageAlt: 'Bathroom faucet and fixtures (illustrative photo, not a company job)',
  },
  {
    title: 'Residential Plumbing',
    href: '/residential-plumbing/',
    description: 'Home plumbing for homeowners and landlords.',
    priority: 'P1',
    image: '/images/residential-plumbing.jpg',
    imageAlt: 'Residential bathroom (illustrative photo, not a company job)',
  },
];

export const allServices = [...p0Services, ...p1Services];

/** Footer money-page links — crawlable, not a second navigation system. */
export const footerServiceLinks = [
  { label: 'Emergency Plumbing', href: '/emergency-plumber/' },
  { label: 'Drain Cleaning', href: '/drain-cleaning/' },
  { label: 'Water Heaters', href: '/water-heaters/' },
  { label: 'Sewer Line Repair', href: '/sewer-line-repair/' },
  { label: 'Leak Detection', href: '/leak-detection/' },
  { label: 'Plumbing Repairs', href: '/plumbing-repairs/' },
] as const;

/** High-value guides for footer crawl paths (not a keyword dump). */
export const footerGuideLinks = [
  { label: 'Emergency checklist', href: '/resources/emergency-plumbing-checklist/' },
  { label: 'Running toilet', href: '/resources/running-toilet/' },
  { label: 'Leaking water heater', href: '/resources/water-heater-leaking/' },
  { label: 'Low water pressure', href: '/resources/low-water-pressure/' },
  { label: 'All plumbing guides', href: '/resources/' },
] as const;

/** Single source for desktop dropdown + mobile accordion — no extra URLs. */
export const navServiceGroups = [
  { heading: 'Core services', items: p0Services },
  { heading: 'Additional services', items: p1Services },
] as const;

export function telHref(): string {
  return `tel:+1${siteConfig.phoneTel}`;
}

export function phoneLabel(): string {
  return `Call ${siteConfig.phoneDisplay}`;
}

/** E.164-style telephone for JSON-LD — derived from the single public NAP number. */
export function schemaTelephone(): string {
  const digits = siteConfig.phoneTel.replace(/\D/g, '');
  const local = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return `+1-${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`;
}
