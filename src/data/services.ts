import { siteConfig } from '../config/site';

export interface ServicePageData {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  lead: string;
  primaryCtaLabel: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stickyVariant?: 'default' | 'emergency';
  formVariant?: 'routine' | 'emergency' | 'commercial' | 'quote';
  formHeading?: string;
  gated?: boolean;
  gateMessage?: string;
  sections: Array<{
    heading: string;
    html: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
  schemaExtra?: object[];
}

export const servicePages: Record<string, ServicePageData> = {
  'drain-cleaning': {
    title: 'Drain Cleaning Virginia Beach | Clogged Drains & Hydro Jetting',
    description:
      'Clogged drain cleaning for kitchens, baths, and main lines in Virginia Beach. Snaking, hydro jetting when appropriate, and camera diagnostics when needed. Call (703) 703-7855.',
    canonicalPath: '/drain-cleaning/',
    h1: 'Drain Cleaning in Virginia Beach',
    lead: 'Slow or clogged drains need the right method, not guesswork. We help Virginia Beach homes and businesses clear fixtures and main lines, and explain when snaking or hydro jetting may fit.',
    primaryCtaLabel: 'Schedule Drain Cleaning',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'routine',
    formHeading: 'Schedule drain cleaning',
    sections: [
      {
        heading: 'Signs you may need drain cleaning',
        html: `<ul>
          <li>Water draining slowly in sinks, showers, or tubs</li>
          <li>Recurring clogs in the same fixture</li>
          <li>Gurgling sounds or odors from drains</li>
          <li>Multiple fixtures backing up at once (possible main-line issue)</li>
        </ul>
        <p>If sewage is backing up into the home, treat it as urgent and see our <a href="/emergency-plumber/">emergency plumbing</a> guidance.</p>`,
      },
      {
        heading: 'Fixture drains vs main line',
        html: `<p>A single clogged sink is often a fixture or branch line issue. When several fixtures fail together - or a floor drain backs up - the problem may be farther down the line toward the sewer lateral.</p>
        <p>For sewer lateral concerns, see <a href="/sewer-line-repair/">sewer line repair</a>.</p>`,
      },
      {
        heading: 'Snaking vs hydro jetting',
        html: `<p><strong>Snaking (augering)</strong> mechanically breaks through many soft blockages and is a common first approach for household clogs.</p>
        <p><strong>Hydro jetting</strong> uses high-pressure water to scour grease, sludge, and debris from the pipe walls when the line condition and access make it appropriate. It is not always the first step.</p>
        <p>Compare methods in our guide: <a href="/resources/hydro-jetting-vs-snaking/">hydro jetting vs snaking</a>.</p>`,
      },
      {
        heading: 'Camera diagnostics when needed',
        html: `<p>If clogs keep returning, a camera inspection can help identify roots, offset joints, collapsed sections, or heavy buildup - so repair decisions are based on evidence rather than guesswork.</p>`,
      },
      {
        heading: 'What to expect on a visit',
        html: `<ol>
          <li>Describe symptoms and which fixtures are affected</li>
          <li>Access and assess the line</li>
          <li>Recommend a clearing method appropriate to the clog</li>
          <li>Explain findings and any follow-up options</li>
        </ol>
        <p>Exact pricing depends on access, severity, and method. We explain options after we see the line.</p>`,
      },
      {
        heading: 'Kitchen, bath, and main-line clogs',
        html: `<p>Kitchen lines often collect grease and food waste. Bathroom drains more often collect hair and soap film. When several fixtures slow at once, the issue may be the main line rather than a single trap.</p>
        <p>Older Virginia Beach housing and coastal properties can also see root intrusion and grease buildup that returns after a single snake. Sandy soils and mature trees along laterals make recurring main-line clogs more than a “hair in the trap” problem. Recurring clogs are a reason to inspect rather than keep punching through the same blockage.</p>`
      },
      {
        heading: 'Residential and commercial drain cleaning',
        html: `<p>We clean fixture and main-line drains for Virginia Beach homes and businesses. Restaurant and kitchen drains are covered in more detail on our <a href="/commercial-plumbing/">commercial plumbing</a> page.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Can I clear a clogged drain myself?',
        answer:
          'Mild sink clogs sometimes respond to a plunger or removing a P-trap carefully. Avoid harsh chemical cleaners that can damage pipes or create hazards for technicians. Recurring or multi-fixture backups usually need professional diagnosis.',
      },
      {
        question: 'Is hydro jetting always better than snaking?',
        answer:
          'Not always. Snaking solves many household clogs. Hydro jetting can help with grease and heavy buildup when the pipe condition supports it. The right method depends on what is in the line.',
      },
      {
        question: 'Do you serve commercial kitchens in Virginia Beach?',
        answer: `Yes. Commercial drain and grease-related work is covered on our <a href="/commercial-plumbing/">commercial plumbing</a> page. Share access notes and preferred service windows when you request help.`,
      },
      {
        question: 'When is a clog actually a sewer problem?',
        answer:
          'If more than one fixture backs up, you smell sewage, or a floor drain overflows, the issue may be the sewer lateral. See our sewer line repair page and consider camera inspection.',
      },
      {
        question: 'Do you hydro jet drains in Virginia Beach?',
        answer:
          'When the line condition and access make it appropriate, yes. Hydro jetting is not automatic. Many household clogs clear with snaking. Recurring grease or main-line buildup is when jetting usually comes up. Compare methods in our <a href="/resources/hydro-jetting-vs-snaking/">hydro jetting vs snaking</a> guide.',
      },
    ],
    related: [
      { label: 'Sewer line repair', href: '/sewer-line-repair/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Plumbing repairs', href: '/plumbing-repairs/' },
      { label: 'Commercial plumbing', href: '/commercial-plumbing/' },
      { label: 'Hydro jetting vs snaking', href: '/resources/hydro-jetting-vs-snaking/' },
    ],
  },

  'sewer-line-repair': {
    title: 'Sewer Line Repair Virginia Beach | Replacement & Camera Inspection',
    description:
      'Sewer line repair and replacement for Virginia Beach homes and businesses. Camera inspection, backup response, and trenchless options when appropriate.',
    canonicalPath: '/sewer-line-repair/',
    h1: 'Sewer Line Repair in Virginia Beach',
    lead: 'Sewer problems need clear diagnosis before dig-or-replace decisions. Camera inspection helps identify roots, breaks, and backups affecting Virginia Beach properties.',
    primaryCtaLabel: 'Schedule Camera Inspection',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'quote',
    formHeading: 'Request sewer inspection',
    sections: [
      {
        heading: 'Common signs of sewer line problems',
        html: `<ul>
          <li>Multiple drains backing up</li>
          <li>Sewage odors indoors or outdoors</li>
          <li>Gurgling toilets when other fixtures run</li>
          <li>Wet or unusually green patches in the yard (possible leak indicators - not a diagnosis alone)</li>
        </ul>`,
      },
      {
        heading: 'Camera inspection first',
        html: `<p>A sewer camera inspection documents the condition of the accessible lateral so repair recommendations match the actual problem - blockage, root intrusion, offset joints, or collapse.</p>`,
      },
      {
        heading: 'Repair vs replacement',
        html: `<p>Localized issues may allow targeted repair. Extensive damage, repeated failures, or collapsed sections may require larger replacement scopes. We outline options after inspection rather than guessing from symptoms alone.</p>`,
      },
      {
        heading: 'Traditional dig and trenchless overview',
        html: `<p>Traditional excavation replaces or repairs pipe with open trenches. <a href="/trenchless-sewer-repair/">Trenchless sewer repair</a> methods (such as lining) may reduce yard disruption when pipe condition and code requirements allow. Method availability depends on pipe condition, access, and applicable codes.</p>
`,
      },
      {
        heading: 'Sewer backups and emergencies',
        html: `<p>Active sewage backup is an urgent health and property issue. See <a href="/emergency-plumber/">emergency plumbing</a> and our guide on <a href="/resources/city-vs-private-plumbing-emergency/">city vs private plumbing emergencies</a>. Also confirm details with Virginia Beach Public Utilities.</p>`,
      },
      {
        heading: 'Coastal and older-housing notes',
        html: `<p>Some Virginia Beach laterals run through sandy soils, mature tree roots, or older clay/cast-iron pipe. Camera inspection is more useful than guessing from a single backup. Parts of the city, including areas such as Pungo, may use septic systems rather than city sewer. This page covers private sewer laterals connected to municipal systems. It is not a septic pumping or septic tank service page.</p>
        <p>More symptoms: <a href="/resources/signs-of-sewer-line-problems/">signs of a sewer line problem</a>.</p>`,
      },
      {
        heading: 'What affects the price',
        html: `<p>Costs vary with length of pipe, depth, landscaping/hardscape, method, permits, and findings on camera. Read <a href="/resources/sewer-line-repair-cost-virginia-beach/">sewer line repair cost factors</a> for an honest overview - then request an inspection-based quote.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Who pays for sewer line repair - homeowner or city?',
        answer:
          'Typically, the private lateral from the home to the connection point is the property owner’s responsibility, while city mains are municipal. Confirm details with Virginia Beach Public Utilities for your situation.',
      },
      {
        question: 'Do I always need full replacement?',
        answer:
          'No. Some problems are cleared or repaired locally. Replacement is considered when damage is extensive or repair would not be durable. Camera findings drive that decision.',
      },
      {
        question: 'Should I get a camera inspection first?',
        answer:
          'Usually yes when backups repeat, multiple fixtures are affected, or you are comparing repair vs replacement. A camera documents the line so you are not paying for a guess.',
      },
    ],
    related: [
      { label: 'Trenchless sewer repair', href: '/trenchless-sewer-repair/' },
      { label: 'Drain cleaning', href: '/drain-cleaning/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Sewer cost factors', href: '/resources/sewer-line-repair-cost-virginia-beach/' },
    ],
  },

  'trenchless-sewer-repair': {
    title: 'Trenchless Sewer Repair Virginia Beach | Pipe Lining & CIPP',
    description:
      'Learn when trenchless sewer repair works for Virginia Beach properties - pipe lining concepts, camera assessment, and alternatives to full dig.',
    canonicalPath: '/trenchless-sewer-repair/',
    h1: 'Trenchless Sewer Repair in Virginia Beach',
    lead: 'Trenchless methods can rehabilitate some sewer lines with less excavation when a camera inspection shows they are a fit. This page covers options, limits, and when a traditional dig may be better.',
    primaryCtaLabel: 'Request Trenchless Assessment',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'quote',
    formHeading: 'Request trenchless assessment',
    sections: [
      {
        heading: 'What “trenchless” means',
        html: `<p>Trenchless sewer repair generally refers to rehabilitating or replacing pipe with limited excavation compared to open-cut dig-and-replace. Access points and cleanouts still matter.</p>`,
      },
      {
        heading: 'CIPP / pipe lining (conceptual)',
        html: `<p>Cured-in-place pipe (CIPP) lining installs a resin-saturated liner that cures inside the existing host pipe, creating a new interior surface when conditions allow. Not every damaged pipe is a lining candidate.</p>`,
      },
      {
        heading: 'Pipe bursting (conceptual)',
        html: `<p>Pipe bursting pulls a new pipe through the path of the old line, fracturing the host pipe outward. It can replace some laterals with fewer open trenches than a full dig, but it still needs access pits and a suitable run. It is not a fit for every collapse, offset, or utility conflict.</p>`,
      },
      {
        heading: 'When trenchless may be a good fit',
        html: `<ul>
          <li>Host pipe is continuous enough to accept a liner</li>
          <li>Offsets and collapses are within method limits</li>
          <li>Access for equipment is available</li>
          <li>Local code and inspection requirements can be met</li>
        </ul>`,
      },
      {
        heading: 'When traditional dig may be better',
        html: `<p>Severe collapse, missing pipe sections, or certain configuration issues may require excavation. Honest assessments compare both paths after camera review. See also <a href="/resources/trenchless-vs-traditional-sewer-repair/">trenchless vs traditional</a>.</p>`,
      },
      {
        heading: 'Inspection-first process',
        html: `<ol>
          <li>Discuss symptoms and property access</li>
          <li>Camera inspection of the line</li>
          <li>Review of options (clean, spot repair, trenchless, dig)</li>
          <li>Quote based on findings - not a phone guess</li>
        </ol>`,
      },
      {
        heading: 'Yard, driveway, and landscaping impact',
        html: `<p>Trenchless methods can reduce how much lawn, driveway, or landscaping is opened, which is often the main reason homeowners ask about lining. Access pits, cleanouts, and restoration still exist. Traditional dig may still be the cleaner repair when the pipe is missing, collapsed beyond method limits, or poorly aligned.</p>`,
      },
      {
        heading: 'What affects the price',
        html: `<p>Price depends on length, access, host-pipe condition, method, permits, and how much restoration is still required. Request an inspection-based assessment.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Is trenchless always cheaper?',
        answer:
          'Not necessarily. It can reduce restoration costs in landscaped yards, but method suitability and project scope drive price. Request an assessment after inspection.',
      },
      {
        question: 'How is this different from sewer line repair?',
        answer:
          'Our <a href="/sewer-line-repair/">sewer line repair</a> page covers the broader problem space. This page focuses on trenchless methods as one set of solutions.',
      },
      {
        question: 'Do you need a camera inspection first?',
        answer:
          'Yes. Trenchless eligibility depends on host-pipe condition, offsets, access, and code requirements. A camera inspection is how you avoid paying for a method the line cannot accept.',
      },
    ],
    related: [
      { label: 'Sewer line repair', href: '/sewer-line-repair/' },
      { label: 'Trenchless vs dig guide', href: '/resources/trenchless-vs-traditional-sewer-repair/' },
      { label: 'Drain cleaning', href: '/drain-cleaning/' },
    ],
  },

  'water-heaters': {
    title: 'Water Heater Repair & Replacement Virginia Beach | Tank Service',
    description:
      'Water heater repair and replacement in Virginia Beach for conventional tanks, plus guidance when tankless is a better fit. Call (703) 703-7855 or request service.',
    canonicalPath: '/water-heaters/',
    h1: 'Water Heater Repair and Replacement in Virginia Beach',
    lead: 'No hot water, lukewarm showers, or a leaking tank? We help Virginia Beach homes decide whether repair or replacement fits the unit, and when tankless belongs on its own page.',
    primaryCtaLabel: 'Request Water Heater Service',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Get Estimate',
    secondaryCtaHref: '/contact/',
    formVariant: 'quote',
    formHeading: 'Request water heater service',
    sections: [
      {
        heading: 'Common water heater problems',
        html: `<ul>
          <li>No hot water</li>
          <li>Not enough hot water or temperature swings</li>
          <li>Leaking tank or fittings</li>
          <li>Rumbling, popping, or unusual noises</li>
          <li>Pilot / ignition issues on gas units</li>
        </ul>
        <p>Cold showers: <a href="/resources/no-hot-water/">no hot water guide</a>. Pooling water: <a href="/resources/water-heater-leaking/">water heater leaking</a>.</p>`,
      },
      {
        heading: 'Repair vs replacement',
        html: `<p>Age, leak location, efficiency, and repair cost relative to a new unit all matter. A leaking tank usually points toward replacement. Element, thermostat, or anode issues may be repairable. Use our decision guide: <a href="/resources/repair-or-replace-water-heater/">repair or replace a water heater</a>.</p>`,
      },
      {
        heading: 'Tank service on this page',
        html: `<p>Most Virginia Beach homes still have a tank. This page focuses on tank repair, same-type replacement, and early checks that tell you whether the heater is the problem.</p>
        <p>If you already have tankless, or you are planning a tank-to-tankless conversion, use <a href="/tankless-water-heaters/">tankless water heaters</a>. That work often needs different gas, venting, or electrical capacity than a like-for-like tank swap.</p>`,
      },
      {
        heading: 'No hot water: a short check',
        html: `<p>If a gas tank has no hot water, confirm the unit has power or a lit/igniting control and that the gas supply is on. If an electric tank is cold, a tripped breaker or failed element is common. A tank that runs out of hot water quickly can be sediment, undersized recovery, or a dip-tube issue. None of those are a diagnosis from a webpage. They are reasons to request water heater service rather than waiting through another cold shower.</p>
        <p>A tank leaking onto the floor is urgent. Lukewarm water with no leak is usually a scheduled visit. See <a href="/emergency-plumber/">emergency plumbing</a> when water is spreading.</p>`,
      },
      {
        heading: 'Emergency and leaking water heaters',
        html: `<p>A tank leaking onto the floor, scalding water, or a T&amp;P valve discharging heavily should be treated as urgent. Shut off power or gas to the unit if you can do so safely, shut off the cold-water supply, and call. See <a href="/emergency-plumber/">emergency plumbing</a>.</p>
        <p>For a fuller breakdown of bottom leaks vs fitting drips, read <a href="/resources/water-heater-leaking/">water heater leaking</a>.</p>`,
      },
      {
        heading: 'Maintenance that can extend life',
        html: `<p>Periodic flushing, anode checks on tanks, and T&amp;P valve awareness help some units last longer. Coastal humidity does not change the basic maintenance idea, but it does make leaks and corrosion worth catching early.</p>`,
      },
      {
        heading: 'Cost factors',
        html: `<p>Unit type, capacity, labor, permits, disposal, and any required upgrades (pan, expansion tank, venting) affect totals. Read <a href="/resources/water-heater-replacement-cost-virginia-beach/">water heater replacement cost factors</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'How long do water heaters typically last?',
        answer:
          'Lifespan varies by type, water quality, and maintenance. Many conventional tanks last roughly a decade-plus; tankless units can last longer with proper service. Treat ranges as general guidance, not a guarantee for your unit.',
      },
      {
        question: 'Is same-day replacement always available?',
        answer: `Availability depends on inventory, permits, and schedule. Call ${siteConfig.phoneDisplay} for current options.`,
      },
      {
        question: 'Tank or tankless, which is better?',
        answer:
          'It depends on fuel type, venting, electrical or gas capacity, and how you use hot water. Tankless is not automatically the right upgrade. Compare options on our <a href="/tankless-water-heaters/">tankless water heaters</a> page after we look at the existing setup.',
      },
      {
        question: 'A leaking tank: repair or replace?',
        answer:
          'A leaking tank usually points toward replacement. Use the repair-versus-replace guide, then request service. If water is on the floor, shut off power or gas if safe, shut the cold supply, and call.',
      },
      {
        question: 'Do you repair tankless water heaters?',
        answer:
          'Yes. Tankless install, conversion, and repair details live on the <a href="/tankless-water-heaters/">tankless water heaters</a> page so this page can stay focused on tank problems and like-for-like replacements.',
      },
    ],
    related: [
      { label: 'Tankless water heaters', href: '/tankless-water-heaters/' },
      { label: 'Gas line services', href: '/gas-line-services/' },
      { label: 'No hot water guide', href: '/resources/no-hot-water/' },
      { label: 'Leaking water heater guide', href: '/resources/water-heater-leaking/' },
      { label: 'Repair vs replace guide', href: '/resources/repair-or-replace-water-heater/' },
      { label: 'Cost factors', href: '/resources/water-heater-replacement-cost-virginia-beach/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
    ],
  },

  'tankless-water-heaters': {
    title: 'Tankless Water Heater Virginia Beach | Install, Convert & Repair',
    description:
      'Tankless water heater installation, tank-to-tankless conversion, and tankless repair in Virginia Beach. Gas supply, venting, and electrical capacity matter. Call (703) 703-7855.',
    canonicalPath: '/tankless-water-heaters/',
    h1: 'Tankless Water Heaters in Virginia Beach',
    lead: 'Tankless units heat water on demand. They can solve run-out-of-hot-water problems, but they are not a drop-in swap for every Virginia Beach home. This page covers install, conversion, and repair when capacity and venting allow.',
    primaryCtaLabel: 'Request Tankless Service',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'quote',
    formHeading: 'Request tankless water heater service',
    sections: [
      {
        heading: 'What tankless is good at',
        html: `<ul>
          <li>Continuous hot water when sized correctly for the fixtures you run at once</li>
          <li>No storage tank that can rust through and flood a garage or closet</li>
          <li>Smaller footprint than a tall tank in some mechanical rooms</li>
        </ul>
        <p>Tankless is not automatically cheaper to own. Hard water and mineral scale matter more on heat exchangers. Periodic descaling is common maintenance, not optional trivia.</p>`,
      },
      {
        heading: 'Why conversions fail as simple replacements',
        html: `<p>A gas tankless unit often needs far more BTU capacity than a storage tank. The existing gas line may be undersized. Venting is usually different from older B-vent tank setups. Electric tankless can demand electrical capacity the panel does not have.</p>
        <p>Virginia Beach water heater work commonly needs a plumbing permit for like-for-like swaps, and tank-to-tankless conversions can involve plumbing and gas permits. Confirm current rules with city Building Permits. Related piping: <a href="/gas-line-services/">gas line services</a>.</p>`,
      },
      {
        heading: 'When to stay with a tank',
        html: `<p>If the gas or electrical infrastructure would need major upgrades, a high-efficiency tank replacement can be the cleaner path. If you only need a failed tank replaced like-for-like, start on <a href="/water-heaters/">water heater repair and replacement</a>.</p>`,
      },
      {
        heading: 'Tankless repair signs',
        html: `<ul>
          <li>Error codes or lockouts</li>
          <li>Lukewarm water or temperature swings</li>
          <li>Ignition faults on gas units</li>
          <li>Scale-related shutdowns after hard-water buildup</li>
          <li>Leaks at fittings or the heat exchanger area</li>
        </ul>
        <p>Describe the brand, any code on the display, and whether cold water still flows. That saves time on the visit.</p>`,
      },
      {
        heading: 'What a visit usually covers',
        html: `<ol>
          <li>Confirm fuel type, venting, and electrical or gas capacity</li>
          <li>Inspect the existing unit or the space for a conversion</li>
          <li>Explain whether repair, like-for-like tankless replacement, or staying with a tank fits better</li>
          <li>Outline permit-related steps when they apply</li>
        </ol>
        <p>We do not quote conversion totals from a chat message. Access, pipe sizes, and venting change the scope.</p>`,
      },
      {
        heading: 'Coastal and hard-water notes',
        html: `<p>Mineral scale and humid mechanical rooms show up on tankless coils and outdoor-adjacent equipment. That is one reason maintenance intervals matter more than on some tanks. Local context: <a href="/resources/coastal-plumbing-challenges-virginia-beach/">coastal plumbing challenges</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Can every home convert to tankless?',
        answer:
          'No. Gas supply, venting, clearances, and electrical capacity decide it. Some homes are better served by a modern tank. An on-site look prevents buying the wrong unit.',
      },
      {
        question: 'Do you install and repair tankless units?',
        answer:
          'Yes. This page is for tankless install, conversion assessment, and repair. Conventional tank problems stay on the water heaters page.',
      },
      {
        question: 'Is tankless always more efficient?',
        answer:
          'It can reduce standby heat loss, but real savings depend on usage patterns, unit sizing, and maintenance. Efficiency claims without looking at your fixtures are marketing, not a plan.',
      },
      {
        question: 'What if my tankless is leaking?',
        answer:
          'Shut power or gas if you can do so safely, shut the cold supply, and call if water is spreading. Fitting drips and heat-exchanger issues are different problems. See emergency plumbing when water is on the floor.',
      },
    ],
    related: [
      { label: 'Water heaters (tank)', href: '/water-heaters/' },
      { label: 'Gas line services', href: '/gas-line-services/' },
      { label: 'No hot water guide', href: '/resources/no-hot-water/' },
      { label: 'Replacement cost factors', href: '/resources/water-heater-replacement-cost-virginia-beach/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
    ],
  },

  'leak-detection': {
    title: 'Leak Detection Virginia Beach | Find Hidden Pipe Leaks',
    description:
      'Professional leak detection for Virginia Beach homes - hidden pipe leaks and water line issues. Schedule diagnosis or call for help.',
    canonicalPath: '/leak-detection/',
    h1: 'Leak Detection in Virginia Beach',
    lead: 'Hidden leaks waste water and damage structures. Professional detection focuses on plumbing supply and drain lines - not pool leak specialists that often dominate Map Pack results.',
    primaryCtaLabel: 'Schedule Leak Detection',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'quote',
    formHeading: 'Schedule leak detection',
    sections: [
      {
        heading: 'Signs of a hidden leak',
        html: `<ul>
          <li>Unexplained high water bills</li>
          <li>Meter moving when fixtures are off</li>
          <li>Damp spots, staining, or musty odors</li>
          <li>Low pressure or the sound of running water</li>
        </ul>`,
      },
      {
        heading: 'Plumbing leaks vs pool leaks',
        html: `<p>Many “leak detection” search results in this market feature pool companies. This page is for <strong>building plumbing and water-line leaks</strong>. Pool equipment leaks are a different specialty.</p>`,
      },
      {
        heading: 'Detection approach',
        html: `<p>Technicians may use acoustic listening, moisture meters, pressure tests, or camera tools depending on the situation and available equipment.</p>
        <p>Findings should lead to a clear repair path - not endless testing.</p>`,
      },
      {
        heading: 'Indoor vs outdoor leaks',
        html: `<p>Indoor leaks may show as stains, musty odors, or wet cabinets. Outdoor or buried water-line leaks may show as meter movement, soggy yard patches, or pressure loss with little visible indoor water. Both still belong to plumbing leak detection, not pool leak companies.</p>
        <p>If you need to shut the house down, see <a href="/resources/shut-off-main-water-valve/">how to shut off the main water valve</a>.</p>`,
      },
      {
        heading: 'From detection to repair',
        html: `<p>Once located, repairs may involve pipe section replacement, fixture stops, or larger repiping. Suspected under-slab issues route to <a href="/slab-leak-repair/">slab leak repair</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Should I shut off the water?',
        answer:
          'If you suspect an active leak causing damage, shut off the main supply if you can do so safely, then call for help. See emergency guidance for major flooding.',
      },
      {
        question: 'Can you find slab leaks?',
        answer:
          'Slab leaks are a specialty path. Visit our <a href="/slab-leak-repair/">slab leak repair</a> page to request an inspection.',
      },
      {
        question: 'Is this the same as pool leak detection?',
        answer:
          'No. This page is for building plumbing and water-line leaks. Pool equipment leaks are a different specialty and often dominate “leak detection” map results.',
      },
      {
        question: 'Can low water pressure mean a leak?',
        answer:
          'Sometimes. Whole-house pressure loss with meter movement is a reason to investigate. See our <a href="/resources/low-water-pressure/">low water pressure</a> guide.',
      },
    ],
    related: [
      { label: 'Slab leak repair', href: '/slab-leak-repair/' },
      { label: 'Repiping', href: '/repiping/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Low water pressure', href: '/resources/low-water-pressure/' },
    ],
  },

  'slab-leak-repair': {
    title: 'Slab Leak Repair Virginia Beach | Detection & Pipe Repair',
    description:
      'Suspect a slab leak in Virginia Beach? Warning signs, detection process, and repair option frameworks.',
    canonicalPath: '/slab-leak-repair/',
    h1: 'Slab Leak Repair in Virginia Beach',
    lead: 'Under-slab leaks can raise bills and damage flooring before you see standing water. Get a clear symptom checklist and repair-options framework for Virginia Beach properties.',
    primaryCtaLabel: 'Request Slab Leak Inspection',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'quote',
    formHeading: 'Request slab leak inspection',
    sections: [
      {
        heading: 'What a slab leak is',
        html: `<p>A slab leak generally means pressurized water line leakage under a concrete foundation slab. It is different from a simple fixture drip.</p>`,
      },
      {
        heading: 'Warning signs',
        html: `<ul>
          <li>Hot spots on flooring</li>
          <li>Unexplained high usage on the water meter</li>
          <li>Sound of water with fixtures off</li>
          <li>Cracks or moisture appearing without an obvious source</li>
        </ul>
        <p>More detail: <a href="/resources/signs-of-slab-leak/">signs of a slab leak</a>.</p>`,
      },
      {
        heading: 'Local context (qualitative only)',
        html: `<p>Coastal Virginia Beach conditions - including high water tables in some areas - can complicate underground moisture issues. A visit is how we see what is actually happening at the property.</p>`,
      },
      {
        heading: 'Detection and repair options framework',
        html: `<p>After confirmation, options may include spot repair with controlled access through the slab, or rerouting/repiping to avoid repeated slab openings. The right path depends on leak location, pipe material, and property constraints.</p>
        <p>Related: <a href="/leak-detection/">leak detection</a> and <a href="/repiping/">repiping</a>.</p>`,
      },
      {
        heading: 'Risks of waiting',
        html: `<p>Ongoing pressurized leaks can undermine flooring finishes and waste water. If you have active flooding, treat it as an <a href="/emergency-plumber/">emergency</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Is every high water bill a slab leak?',
        answer:
          'No. Running toilets, irrigation, or other fixtures can cause high usage. Meter checks and professional diagnosis help narrow causes.',
      },
      {
        question: 'How urgent is a slab leak?',
        answer:
          'A confirmed pressurized leak under the slab is worth prompt inspection. Waiting can spread moisture into flooring and waste water. Active flooding is an emergency. Call now.',
      },
      {
        question: 'Do you always have to open the slab?',
        answer:
          'Not always. Some leaks are repaired through limited access; others are rerouted so the slab is opened less. The location and pipe material drive that choice after detection.',
      },
    ],
    related: [
      { label: 'Leak detection', href: '/leak-detection/' },
      { label: 'Repiping', href: '/repiping/' },
      { label: 'Signs of a slab leak', href: '/resources/signs-of-slab-leak/' },
      { label: 'Emergency', href: '/emergency-plumber/' },
    ],
  },

  'commercial-plumbing': {
    title: 'Commercial Plumber Virginia Beach | Business Plumbing Services',
    description:
      'Commercial plumbing for Virginia Beach restaurants, offices, hospitality, and property managers. Request commercial service or call.',
    canonicalPath: '/commercial-plumbing/',
    h1: 'Commercial Plumber in Virginia Beach',
    lead: 'Businesses need clear scopes, access planning, and reliable follow-up. Request commercial plumbing help for Virginia Beach properties.',
    primaryCtaLabel: 'Request Commercial Service',
    primaryCtaHref: '#request-form',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'commercial',
    formHeading: 'Request commercial service',
    stickyVariant: 'default',
    sections: [
      {
        heading: 'Commercial services overview',
        html: `<ul>
          <li>Drain cleaning and kitchen line issues</li>
          <li>Commercial water heaters</li>
          <li>Fixture and restroom repairs</li>
          <li>Leak response and pipe repair</li>
          <li>Backflow-related needs. See <a href="/backflow-testing/">backflow testing</a></li>
        </ul>
`,
      },
      {
        heading: 'Restaurants and commercial kitchens',
        html: `<p>Grease, floor drains, and high-use fixtures create recurring demand. Share equipment access notes and preferred service windows when you request help.</p>
        <p>Kitchen lines fail differently than house drains: grease emulsifies when hot, then sets in the line. Recurring floor-drain backups are a reason to clear and inspect, not to keep pouring chemicals. Grease interceptor / trap servicing is a related commercial need. Describe what you have on site when you request work rather than assuming a residential snake is enough.</p>
        <p>Use our <a href="/resources/commercial-kitchen-plumbing-checklist/">commercial kitchen plumbing checklist</a> to prepare before a visit.</p>`,
      },
      {
        heading: 'Hospitality and Oceanfront properties',
        html: `<p>Hotels and short-term rentals near the Oceanfront face guest-impacting failures and coastal wear. Include property access notes when you request commercial service.</p>
`,
      },
      {
        heading: 'Offices, retail, and multi-unit',
        html: `<p>Property managers should include unit access instructions, gate codes, and after-hours preferences in the request form.</p>`,
      },
      {
        heading: 'Compliance and backflow',
        html: `<p>Virginia Beach has annual backflow testing requirements for many assemblies. See <a href="/backflow-testing/">backflow testing</a> and the city Public Utilities guidance for compliance pathways.</p>`,
      },
      {
        heading: 'How commercial requests work',
        html: `<ol>
          <li>Submit business details and property type</li>
          <li>Describe the issue and urgency</li>
          <li>Share access and scheduling constraints</li>
          <li>Receive follow-up for qualification and dispatch</li>
        </ol>
        <p>Ask about documentation needs when you request commercial service.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Do you offer after-hours commercial service?',
        answer: `Yes. We are open 24/7. Call for after-hours commercial needs and we will confirm next steps.`,
      },
      {
        question: 'Can property managers set up recurring service?',
        answer:
          'Recurring maintenance can be discussed when you submit a commercial request.',
      },
    ],
    related: [
      { label: 'Backflow testing', href: '/backflow-testing/' },
      { label: 'Drain cleaning', href: '/drain-cleaning/' },
      { label: 'Water heaters', href: '/water-heaters/' },
      { label: 'Emergency', href: '/emergency-plumber/' },
    ],
  },

  repiping: {
    title: 'Repiping Virginia Beach | Galvanized Pipe Replacement',
    description:
      'Whole-home and galvanized pipe repiping in Virginia Beach. Learn signs, process, and cost factors - then request a quote.',
    canonicalPath: '/repiping/',
    h1: 'Repiping in Virginia Beach',
    lead: 'Low pressure, discolored water, and frequent leaks can point to aging supply lines. Repiping replaces problematic piping with a planned scope - not patch-after-patch guessing.',
    primaryCtaLabel: 'Request Repipe Quote',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'quote',
    sections: [
      {
        heading: 'Signs repiping may be worth evaluating',
        html: `<ul>
          <li>Rusty or discolored water</li>
          <li>Chronically low pressure</li>
          <li>Repeated pinhole leaks</li>
          <li>Known galvanized supply lines in older homes</li>
        </ul>`,
      },
      {
        heading: 'Process overview',
        html: `<p>Evaluation, material selection (such as PEX or copper where appropriate), staging rooms for access, and restoring finishes are typical phases. Exact materials and warranty terms depend on the job and applicable codes.</p>
        <p>Galvanized steel supply lines in older Virginia Beach housing can corrode from the inside, which shows up as rusty water, low pressure at several fixtures, and pinholes. Polybutylene (if present) is a different material conversation. We identify what is actually in the walls before recommending a whole-home scope.</p>
        <p>Whole-house low pressure is not always a repipe. See <a href="/resources/low-water-pressure/">low water pressure causes</a> and <a href="/leak-detection/">leak detection</a> when a hidden leak might be involved.</p>
`,
      },
      {
        heading: 'Cost factors',
        html: `<p>Home size, fixture count, access, material choice, and restoration needs drive price. A quote visit is how we size the job to the house.</p>`,
      },
      {
        heading: 'Galvanized pipe and older housing',
        html: `<p>Galvanized supply lines in older homes can corrode from the inside, which shows up as rusty water, low pressure, and repeating pinhole leaks. Spot repairs still have a place for an isolated failure. Systemic corrosion is why whole-home or large-section replacement comes up.</p>
        <p>Low pressure throughout the house is covered in more detail on <a href="/resources/low-water-pressure/">low water pressure</a>.</p>`,
      },
      {
        heading: 'What a quote visit is for',
        html: `<p>A visit is how we see pipe material, access through walls and ceilings, and how much finish work a repipe would disturb. That is also when PEX versus copper (or a mix) gets discussed against the house.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Can you spot-repair instead of full repipe?',
        answer:
          'Sometimes. Spot repairs make sense for isolated failures. Systemic galvanized corrosion often leads to broader replacement discussions.',
      },
      {
        question: 'Do you quote a whole-home repipe over the phone?',
        answer:
          'No. Home size, access, material, and restoration drive the scope. Request a quote visit so the recommendation matches the house.',
      },
    ],
    related: [
      { label: 'Leak detection', href: '/leak-detection/' },
      { label: 'Slab leak repair', href: '/slab-leak-repair/' },
      { label: 'Water heaters', href: '/water-heaters/' },
      { label: 'Low water pressure', href: '/resources/low-water-pressure/' },
    ],
  },

  'gas-line-services': {
    title: 'Gas Line Repair Virginia Beach | Gas Plumbing Safety',
    description:
      'Gas line repair and installation guidance for Virginia Beach. Safety-first: if you smell gas, leave and contact the utility/emergency services first.',
    canonicalPath: '/gas-line-services/',
    h1: 'Gas Line Services in Virginia Beach',
    lead: 'Gas work requires proper licensing and safety discipline. If you smell gas, evacuate and call the gas utility or emergency services before contacting a plumber.',
    primaryCtaLabel: 'Call Now',
    secondaryCtaLabel: 'Request Service',
    secondaryCtaHref: '/contact/',
    formVariant: 'routine',
    sections: [
      {
        heading: 'Gas smell: safety protocol first',
        html: `<ol>
          <li>Leave the area immediately</li>
          <li>Do not operate lights, switches, or phones inside the hazard area</li>
          <li>Call the gas utility / emergency services from a safe location</li>
          <li>Contact a qualified plumber only after the area is declared safe</li>
        </ol>`,
      },
      {
        heading: 'Typical gas plumbing requests',
        html: `<p>After the area is safe, typical work includes:</p>
        <ul>
          <li>Repairing damaged or corroded gas piping</li>
          <li>Appliance connectors for ranges, dryers, and fireplaces</li>
          <li>New or resized runs when a <a href="/water-heaters/">gas water heater</a> or tankless conversion needs more capacity</li>
        </ul>
        <p>Permits and inspections apply to many gas jobs. We do not list unverified license numbers on this page. Ask when you call if you need that detail for a permit.</p>
        <p>Coastal air and moisture can wear outdoor piping and connectors. If you notice rust, damage, or a gas smell, follow the safety steps above, then call. See also <a href="/resources/coastal-plumbing-challenges-virginia-beach/">coastal plumbing challenges</a>.</p>`,
      },
      {
        heading: 'What a visit is for',
        html: `<p>A visit is how we see the existing piping, shutoffs, and whether the request is a connector, a leak on the house side, or a new run. We will not diagnose a gas smell over a form. If you already called the utility, tell us that when you request service.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Is a gas smell a plumbing emergency?',
        answer:
          'It is a life-safety emergency. Utility and emergency responders come first. Plumbers address gas piping after the hazard is controlled.',
      },
      {
        question: 'Can you repair or install a gas line?',
        answer:
          'Yes, after the area is safe. If you smell gas, leave and contact the utility or emergency services first. Call us for piping work once the hazard is controlled.',
      },
      {
        question: 'Do gas line jobs need a permit in Virginia Beach?',
        answer:
          'Many gas piping installs and modifications do. Permits and inspections are a normal part of that work. Ask when you call if you need that detail for a specific job. This page does not list unverified license numbers.',
      },
    ],
    related: [
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Water heaters', href: '/water-heaters/' },
    ],
  },

  'backflow-testing': {
    title: 'Backflow Testing Virginia Beach | Preventer Installation',
    description:
      'Backflow testing and preventer guidance for Virginia Beach properties. Learn the local compliance path and request testing.',
    canonicalPath: '/backflow-testing/',
    h1: 'Backflow Testing in Virginia Beach',
    lead: 'Many commercial and some residential assemblies need annual testing. This page explains the local compliance path and how to request service.',
    primaryCtaLabel: 'Schedule Backflow Test',
    primaryCtaHref: '/contact/',
    formVariant: 'routine',
    sections: [
      {
        heading: 'Why backflow testing matters',
        html: `<p>Backflow preventers help keep contaminated water from reversing into the potable supply. Testing confirms assemblies work as required.</p>`,
      },
      {
        heading: 'Virginia Beach compliance path',
        html: `<p>Virginia Beach Public Utilities publishes backflow/cross-connection program requirements, including annual testing workflows (commonly referenced with SwiftComply). Always verify current city instructions on official .gov pages.</p>
        <p><a href="${siteConfig.cityUtilitiesEmergencyUrl}" rel="noopener noreferrer" target="_blank">Virginia Beach Public Utilities</a></p>
        <p>Educational companion: <a href="/resources/backflow-testing-virginia-beach/">Virginia Beach backflow testing guide</a>.</p>`,
      },
      {
        heading: 'Testing vs installation or repair',
        html: `<p>Annual testing checks whether the assembly still works. Failed devices need repair or replacement as a separate scope. Commercial properties and some residential irrigation or fire-line setups are more likely to have testable assemblies than a typical house with no backflow device.</p>
        <p>If you received a city testing notice, bring the assembly location and due date when you request service. We explain the local path on this page and on the <a href="/resources/backflow-testing-virginia-beach/">Virginia Beach backflow guide</a>; official rules always live on <a href="${siteConfig.cityUtilitiesEmergencyUrl}" rel="noopener noreferrer" target="_blank">Virginia Beach Public Utilities</a>.</p>
`,
      },
    ],
    faqs: [
      {
        question: 'Is this the same as a regular plumbing repair visit?',
        answer:
          'Testing is a compliance inspection of the assembly. Repair or replacement is separate if the device fails.',
      },
      {
        question: 'Do residential homes always need annual backflow testing?',
        answer:
          'Not always. Many commercial properties and some irrigation or fire-line setups have testable assemblies. A typical house with no backflow device is different. Confirm requirements with Virginia Beach Public Utilities.',
      },
    ],
    related: [
      { label: 'Commercial plumbing', href: '/commercial-plumbing/' },
      { label: 'Backflow guide', href: '/resources/backflow-testing-virginia-beach/' },
    ],
  },

  'sump-pump': {
    title: 'Sump Pump Installation & Repair Virginia Beach',
    description:
      'Sump pump installation, repair, and maintenance for Virginia Beach properties. Schedule service or call (703) 703-7855.',
    canonicalPath: '/sump-pump/',
    h1: 'Sump Pump Services in Virginia Beach',
    lead: 'Sump pumps help manage groundwater and storm-related water around foundations. Installation and repair should match the pit, discharge path, and power setup.',
    primaryCtaLabel: 'Schedule Sump Service',
    primaryCtaHref: '/contact/',
    formVariant: 'routine',
    sections: [
      {
        heading: 'When sump pumps matter locally',
        html: `<p>Heavy rain and high water tables in parts of coastal Virginia make basement and crawlspace water management a practical concern. Whether a sump is the right fit depends on the pit, discharge path, and how the property handles groundwater.</p>`,
      },
      {
        heading: 'Signs the pump is failing',
        html: `<ul>
          <li>Water in the basement or crawlspace after rain</li>
          <li>The pump runs constantly or short-cycles</li>
          <li>The pump never runs, even after a storm</li>
          <li>Grinding, humming, or a float that sticks</li>
          <li>Discharge line that is frozen, crushed, or draining back into the pit</li>
        </ul>
        <p>A sump moves groundwater or storm water from a pit. Sewage backing up into fixtures is a different problem. See <a href="/sewer-line-repair/">sewer line repair</a>.</p>`,
      },
      {
        heading: 'Install, repair, and maintenance',
        html: `<p>Scopes may include new installs, float switch replacement, check valve issues, and backup power discussions. Test the pump before hurricane season and after long idle periods. A sump that never runs can seize; one that runs constantly may have a check-valve, discharge, or groundwater issue.</p>
        <p>Storm prep belongs with <a href="/resources/storm-plumbing-prep-virginia-beach/">storm plumbing prep</a>. Active flooding in living space is <a href="/emergency-plumber/">emergency plumbing</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Do I need a battery backup?',
        answer:
          'Backup power can help during outages when groundwater keeps rising. Whether you need one depends on risk tolerance and site conditions.',
      },
      {
        question: 'Is a sump pump the same as a sewer backup?',
        answer:
          'No. A sump pump moves groundwater or storm water from a pit. Sewage backing up into fixtures is a different problem. See sewer line repair or emergency plumbing.',
      },
    ],
    related: [
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Residential plumbing', href: '/residential-plumbing/' },
      { label: 'Storm plumbing prep', href: '/resources/storm-plumbing-prep-virginia-beach/' },
    ],
  },

  'residential-plumbing': {
    title: 'Residential Plumber Virginia Beach | Home Plumbing Services',
    description:
      'Residential plumbing for Virginia Beach homeowners and landlords - drains, water heaters, leaks, and more. Call or request service.',
    canonicalPath: '/residential-plumbing/',
    h1: 'Residential Plumber in Virginia Beach',
    lead: 'Fixture issues, drain clogs, water heaters, and larger repairs all fall under residential plumbing. Pick the service that matches the problem, or request help and we will route it.',
    primaryCtaLabel: 'Request Residential Service',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'View All Services',
    secondaryCtaHref: '/plumbing-services/',
    formVariant: 'routine',
    sections: [
      {
        heading: 'Homeowner services',
        html: `<p>Common residential needs include <a href="/plumbing-repairs/">toilet, faucet, and disposal repairs</a>, <a href="/drain-cleaning/">drain cleaning</a>, <a href="/water-heaters/">water heaters</a>, <a href="/leak-detection/">leak detection</a>, and <a href="/sewer-line-repair/">sewer repair</a>.</p>
        <p>If you already know the problem, go straight to that page. This page is for homeowners and landlords who need the right door, not a second copy of every service.</p>
        <ul>
          <li>One fixture clogged → drain cleaning</li>
          <li>Toilet running or faucet dripping → plumbing repairs</li>
          <li>No hot water → water heaters</li>
          <li>Several drains failing together → sewer line repair</li>
          <li>Water you cannot find → leak detection</li>
          <li>Flooding or sewage in the house → emergency plumbing</li>
        </ul>`,
      },
      {
        heading: 'Landlords and property turnover',
        html: `<p>Rental turnovers, move-outs, and military PCS seasons can stack toilet, faucet, disposal, and water-heater punch-list items in a short window. Share gate codes, unit numbers, and whether tenants will be home. This page does not advertise a military discount. We simply serve Virginia Beach homes, including areas near NAS Oceana and Little Creek, when you need a plumber.</p>
`,
      },
      {
        heading: 'Urgent residential problems',
        html: `<p>For burst pipes, major leaks, or sewer backups, go to <a href="/emergency-plumber/">emergency plumbing</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Is residential different from the homepage plumber search?',
        answer:
          'The homepage is for finding a Virginia Beach plumber in general. This page is for homeowners, landlords, and rental turnovers, then links you into the specific service you need.',
      },
      {
        question: 'Do you handle toilets, faucets, and disposals?',
        answer:
          'Yes. Those fixture jobs live on our plumbing repairs page so this page can stay focused on homeowner and landlord routing.',
      },
      {
        question: 'Can landlords request service for a rental unit?',
        answer:
          'Yes. Include the unit address or ZIP, access notes, and whether tenants will be present. For sewage backup or flooding, call emergency plumbing first.',
      },
    ],
    related: [
      { label: 'Plumbing repairs', href: '/plumbing-repairs/' },
      { label: 'Plumbing services', href: '/plumbing-services/' },
      { label: 'Commercial plumbing', href: '/commercial-plumbing/' },
      { label: 'Emergency', href: '/emergency-plumber/' },
    ],
  },

  'plumbing-repairs': {
    title: 'Plumbing Repairs Virginia Beach | Toilets, Faucets & Disposals',
    description:
      'Toilet repair, faucet repair, and garbage disposal service in Virginia Beach. Call (703) 703-7855 or request a visit for fixture plumbing repairs.',
    canonicalPath: '/plumbing-repairs/',
    h1: 'Plumbing Repairs in Virginia Beach',
    lead: 'Running toilets, dripping faucets, and jammed disposals are everyday plumbing jobs until they waste water or overflow. This page covers fixture repairs for Virginia Beach homes and rentals, and points you to emergency help when water will not stop.',
    primaryCtaLabel: 'Schedule a Repair',
    primaryCtaHref: '/contact/',
    secondaryCtaLabel: 'Call Now',
    formVariant: 'routine',
    formHeading: 'Request a plumbing repair',
    sections: [
      {
        heading: 'What plumbing repairs cover',
        html: `<p>Plumbing repairs here means fixture-level work: toilets, faucets, sinks, and garbage disposals. It is not the page for a main-line backup, a leaking water heater tank, or a sewer lateral. Those have their own service pages so search intent stays clear.</p>
        <p>If one fixture is the problem, start here. If several fixtures fail at once, see <a href="/drain-cleaning/">drain cleaning</a> or <a href="/sewer-line-repair/">sewer line repair</a>.</p>`,
      },
      {
        heading: 'Toilet repair',
        html: `<p>Common toilet calls in Virginia Beach homes include a toilet that keeps running, a weak or incomplete flush, a clog that will not clear with a plunger, leaking at the base, or a fill valve that never shuts off.</p>
        <ul>
          <li><strong>Running toilet:</strong> Usually a flapper, fill valve, or chain issue. It wastes water even when nobody is in the bathroom. See the <a href="/resources/running-toilet/">running toilet guide</a>.</li>
          <li><strong>Clogged toilet:</strong> A single clogged toilet is often a fixture or branch-line issue. If the tub or shower backs up when you flush, treat it as a drain or sewer problem.</li>
          <li><strong>Overflowing toilet:</strong> Shut the supply valve at the wall if you can do so safely. Step-by-step: <a href="/resources/toilet-overflowing/">toilet overflowing</a>. If water is spreading, use <a href="/emergency-plumber/">emergency plumbing</a>.</li>
        </ul>`,
      },
      {
        heading: 'Faucet and fixture leaks',
        html: `<p>Drips at the spout, leaks under the handle, or water at the supply lines can be a washer, cartridge, or connection issue. A slow drip is not always an emergency, but it can stain fixtures and raise the water bill.</p>
        <p>If you cannot tell whether the leak is the faucet or a pipe in the cabinet or wall, use <a href="/leak-detection/">leak detection</a> instead of guessing.</p>`,
      },
      {
        heading: 'Garbage disposal repair',
        html: `<p>Humming without spinning, frequent resets, leaks at the sink flange, and persistent odors are typical disposal issues. Reset buttons and hex-key turns can free a jammed impeller, but never put your hand in the chamber, even with the breaker off unless you are sure power is isolated.</p>
        <p>A disposal that backs water into the other sink bowl is often a drain clog, not a failed motor. That belongs with <a href="/drain-cleaning/">drain cleaning</a>.</p>`,
      },
      {
        heading: 'When a “small repair” is actually urgent',
        html: `<ul>
          <li>Toilet overflowing onto the floor</li>
          <li>Supply line spraying under a sink</li>
          <li>Sewage smell with more than one fixture backing up</li>
        </ul>
        <p>Call ${siteConfig.phoneDisplay} anytime. We are open 24/7. Safety steps: <a href="/resources/emergency-plumbing-checklist/">emergency plumbing checklist</a>.</p>`,
      },
      {
        heading: 'What to expect on a visit',
        html: `<ol>
          <li>Describe the fixture and whether water is still running</li>
          <li>We inspect access, shutoffs, and the failed part</li>
          <li>Repair the fixture when parts and condition allow</li>
          <li>Explain if a full replacement is the cleaner option</li>
        </ol>
        <p>Access, parts, and whether the issue is the fixture or the drain all change the work. Call or request a visit for a price that matches the job.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Can I keep using a running toilet until someone arrives?',
        answer:
          'You can often shut the supply valve behind the toilet to stop the waste. If you cannot find that valve or water is overflowing, shut the main and call. A running toilet is usually not an emergency, but it should not wait for weeks.',
      },
      {
        question: 'Do you replace toilets and faucets as well as repair them?',
        answer:
          'Replacement is a common next step when parts are discontinued, the fixture is cracked, or repair would cost more than a new unit. Bring the brand or a photo if you already picked a replacement fixture.',
      },
      {
        question: 'Is a clogged toilet drain cleaning or a toilet repair?',
        answer:
          'A single toilet that will not flush after plunging is usually a toilet or nearby branch-line issue. If multiple fixtures back up, go to drain cleaning or sewer line repair.',
      },
      {
        question: 'Do you serve rentals and landlords in Virginia Beach?',
        answer:
          'Yes. Share unit access notes on the request. Homeowner and landlord routing is also on our residential plumbing page.',
      },
    ],
    related: [
      { label: 'Residential plumbing', href: '/residential-plumbing/' },
      { label: 'Running toilet guide', href: '/resources/running-toilet/' },
      { label: 'Toilet overflowing', href: '/resources/toilet-overflowing/' },
      { label: 'Drain cleaning', href: '/drain-cleaning/' },
      { label: 'Leak detection', href: '/leak-detection/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
    ],
  },
};

export function getServicePage(slug: string): ServicePageData {
  const page = servicePages[slug];
  if (!page) throw new Error(`Unknown service page: ${slug}`);
  return page;
}
