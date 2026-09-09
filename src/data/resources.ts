export type ResourceGroup = 'emergency' | 'cost' | 'decision' | 'local';

export interface ResourceGuide {
  slug: string;
  title: string;
  description: string;
  h1: string;
  moneyLink: { label: string; href: string };
  group: ResourceGroup;
  sections: Array<{ heading: string; html: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  related?: Array<{ label: string; href: string }>;
}

export const resources: ResourceGuide[] = [
  {
    slug: 'emergency-plumbing-checklist',
    title: 'Emergency Plumbing Checklist | Virginia Beach',
    description:
      'Practical checklist for plumbing emergencies—shutoff steps, safety, and when to call a plumber in Virginia Beach.',
    h1: 'Emergency Plumbing Checklist',
    moneyLink: { label: 'Emergency plumber page', href: '/emergency-plumber/' },
    group: 'emergency',
    sections: [
      {
        heading: 'Immediate safety',
        html: `<ol><li>Keep people away from sewage and standing water near electricity</li><li>If you smell gas, leave and call the utility/emergency services first</li><li>Shut off the main water valve if you can do so safely</li></ol>`,
      },
      {
        heading: 'Document and contain',
        html: `<p>Move valuables, photograph damage for insurance, and use towels/buckets only if safe. Avoid chemical drain bombs during active backups.</p>`,
      },
      {
        heading: 'Call for help',
        html: `<p>Contact an emergency plumber for private plumbing failures. City main issues may belong to Virginia Beach Public Utilities.</p>
        <p>Use the <a href="/resources/city-vs-private-plumbing-emergency/">city vs private emergency</a> guide if you are unsure. Shutoff help: <a href="/resources/shut-off-main-water-valve/">how to shut off the main water valve</a>.</p>`,
      },
      {
        heading: 'What usually counts as urgent',
        html: `<ul>
          <li>Burst pipes or active flooding</li>
          <li>Sewage backing up into living space</li>
          <li>A major leak you cannot stop at a fixture</li>
          <li>A water heater tank dumping water on the floor</li>
        </ul>
        <p>A slow drain or a dripping faucet can usually wait for scheduled service. If water is damaging the home, call (703) 703-7855 — we are open 24/7.</p>`,
      },
    ],
    related: [
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Burst pipe steps', href: '/resources/what-to-do-when-a-pipe-bursts/' },
      { label: 'City vs private emergency', href: '/resources/city-vs-private-plumbing-emergency/' },
    ],
  },
  {
    slug: 'plumber-cost-virginia-beach',
    title: 'How Much Does a Plumber Cost in Virginia Beach? | Cost Factors',
    description:
      'Plumbing cost factors for Virginia Beach—trip fees, labor, parts, and urgency.',
    h1: 'Plumbing Cost Factors in Virginia Beach',
    moneyLink: { label: 'Request an estimate', href: '/contact/' },
    group: 'cost',
    sections: [
      {
        heading: 'What drives plumbing costs',
        html: `<ul><li>Urgency (emergency vs scheduled)</li><li>Access and diagnosis time</li><li>Parts and fixtures</li><li>Permits for some installs</li><li>Restoration after invasive repairs</li></ul>
        <p>Emergency after-hours work usually costs more than scheduled visits because of overtime and dispatch. For a scoped job, <a href="/contact/">request an estimate</a> or call (703) 703-7855.</p>
        <p>Related: <a href="/resources/water-heater-replacement-cost-virginia-beach/">water heater replacement cost factors</a> and <a href="/resources/sewer-line-repair-cost-virginia-beach/">sewer line repair cost factors</a>.</p>`,
      },
      {
        heading: 'What a useful quote needs',
        html: `<p>A phone or chat description is not a bid. Access, pipe material, fixture type, and whether the issue is one fixture or a main line all change the work. Bring the ZIP, a short description, and whether water is currently off or backing up. Call (703) 703-7855 for emergencies instead of waiting on a form.</p>`,
      },
    ],
  },
  {
    slug: 'water-heater-replacement-cost-virginia-beach',
    title: 'Water Heater Replacement Cost Virginia Beach | Factors',
    description:
      'What affects water heater replacement cost in Virginia Beach—unit type, labor, permits, and upgrades.',
    h1: 'Water Heater Replacement Cost Factors',
    moneyLink: { label: 'Water heater services', href: '/water-heaters/' },
    group: 'cost',
    sections: [
      {
        heading: 'Cost factors',
        html: `<ul><li>Tank vs tankless</li><li>Capacity and efficiency</li><li>Fuel type and venting</li><li>Code upgrades (pan, expansion tank, seismic straps where required)</li><li>Disposal of the old unit</li></ul>`,
      },
      {
        heading: 'Repair vs replace still comes first',
        html: `<p>A leaking tank usually points toward replacement. A failed element, thermostat, or anode on a younger unit may be a repair. Use the <a href="/resources/repair-or-replace-water-heater/">repair or replace guide</a>, then request service on our <a href="/water-heaters/">water heater</a> page.</p>`,
      },
    ],
  },
  {
    slug: 'repair-or-replace-water-heater',
    title: 'Repair or Replace a Water Heater? | Decision Guide',
    description:
      'How to think about repairing vs replacing a water heater—age, leaks, and efficiency—then get local help in Virginia Beach.',
    h1: 'Is It Worth Repairing a Water Heater?',
    moneyLink: { label: 'Water heater services', href: '/water-heaters/' },
    group: 'decision',
    sections: [
      {
        heading: 'Lean repair when…',
        html: `<p>The unit is relatively young, the issue is a replaceable part (element, thermostat, anode in some cases), and there is no tank leak.</p>`,
      },
      {
        heading: 'Lean replace when…',
        html: `<p>The tank is leaking, the unit is near end of life, or repair cost approaches replacement value.</p>`,
      },
      {
        heading: 'If the tank is leaking',
        html: `<p>If the tank is leaking onto the floor, treat it as urgent: shut off power or gas if you can do so safely, shut the cold-water supply, and call. A website cannot tell you how many years a tank has left. Details: <a href="/water-heaters/">water heater services</a>.</p>`,
      },
    ],
  },
  {
    slug: 'sewer-line-repair-cost-virginia-beach',
    title: 'Sewer Line Repair Cost Virginia Beach | Factors',
    description:
      'Sewer repair cost factors for Virginia Beach—camera findings, length, depth, method, and restoration.',
    h1: 'Sewer Line Repair Cost Factors',
    moneyLink: { label: 'Sewer line repair', href: '/sewer-line-repair/' },
    group: 'cost',
    sections: [
      {
        heading: 'What changes the price',
        html: `<ul><li>Camera findings</li><li>Length and depth of pipe</li><li>Dig vs trenchless suitability</li><li>Landscaping and hardscape restoration</li><li>Permits and inspections</li></ul>
        <p>A phone description cannot price a sewer job honestly. Camera inspection shows whether you are looking at a blockage, roots, a broken joint, or a collapse — and that finding drives method and restoration.</p>`,
      },
      {
        heading: 'Private lateral vs city main',
        html: `<p>The pipe from the house to the municipal connection is usually the property owner’s responsibility. City mains are not. Confirm details with Virginia Beach Public Utilities when the source is unclear. See <a href="/resources/city-vs-private-plumbing-emergency/">city vs private emergencies</a>.</p>`,
      },
      {
        heading: 'How to get a useful quote',
        html: `<p>Request a <a href="/sewer-line-repair/">camera inspection</a>. Compare methods on <a href="/resources/trenchless-vs-traditional-sewer-repair/">trenchless vs traditional repair</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Can you quote sewer repair over the phone?',
        answer:
          'Not accurately. Length, depth, access, and camera findings change the work. Call for an emergency backup, or request an inspection-based quote for planned repair.',
      },
    ],
    related: [
      { label: 'Sewer line repair', href: '/sewer-line-repair/' },
      { label: 'Trenchless sewer repair', href: '/trenchless-sewer-repair/' },
    ],
  },
  {
    slug: 'trenchless-vs-traditional-sewer-repair',
    title: 'Trenchless vs Traditional Sewer Repair | Comparison',
    description:
      'Compare trenchless and traditional sewer repair approaches—when lining may work and when digging is better.',
    h1: 'Trenchless vs Traditional Sewer Repair',
    moneyLink: { label: 'Trenchless sewer repair', href: '/trenchless-sewer-repair/' },
    group: 'decision',
    sections: [
      {
        heading: 'Quick comparison',
        html: `<p><strong>Traditional dig</strong> excavates to replace or repair pipe—reliable for collapses but more disruptive.</p><p><strong>Trenchless</strong> can reduce excavation when the host pipe and codes allow lining or similar methods.</p>`,
      },
      {
        heading: 'How to choose without guessing',
        html: `<p>Camera findings, not a sales page, decide the method. Lining needs a host pipe that can accept it. Missing sections, severe collapse, or utility conflicts often mean digging. Request an assessment on <a href="/trenchless-sewer-repair/">trenchless sewer repair</a> or start with <a href="/sewer-line-repair/">sewer line repair</a>.</p>`,
      },
    ],
  },
  {
    slug: 'signs-of-slab-leak',
    title: 'Signs of a Slab Leak | Virginia Beach Homeowners',
    description:
      'Warning signs of a possible slab leak—high bills, hot spots, and meter movement—plus when to request inspection.',
    h1: 'Signs of a Slab Leak',
    moneyLink: { label: 'Slab leak repair', href: '/slab-leak-repair/' },
    group: 'decision',
    sections: [
      {
        heading: 'Watch for',
        html: `<ul><li>Unexplained water usage</li><li>Warm spots on floors</li><li>Sound of water with fixtures off</li><li>Moisture without an obvious source</li></ul>
        <p>None of these prove a slab leak by themselves. Running toilets, irrigation, and other fixtures can also raise a bill.</p>`,
      },
      {
        heading: 'A quick meter check',
        html: `<p>If you can do so safely: make sure fixtures are off, then watch the water meter. Movement with nothing running is a reason to investigate a leak — still not a diagnosis of <em>where</em>.</p>`,
      },
      {
        heading: 'What to do next',
        html: `<p>If water is spreading across a floor, treat it as urgent: shut off the main if you can, then call. For suspected under-slab leaks without flooding, request inspection on our <a href="/slab-leak-repair/">slab leak repair</a> page. Related: <a href="/leak-detection/">leak detection</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Is a warm spot on the floor always a slab leak?',
        answer:
          'No. It is a clue worth checking, especially with a rising water bill or the sound of water when fixtures are off. Confirmation takes detection, not a webpage.',
      },
    ],
    related: [
      { label: 'Slab leak repair', href: '/slab-leak-repair/' },
      { label: 'Leak detection', href: '/leak-detection/' },
    ],
  },
  {
    slug: 'hydro-jetting-vs-snaking',
    title: 'Hydro Jetting vs Snaking | Drain Cleaning Methods',
    description:
      'How snaking and hydro jetting differ for drain cleaning—and when each approach may fit.',
    h1: 'Hydro Jetting vs Snaking',
    moneyLink: { label: 'Drain cleaning', href: '/drain-cleaning/' },
    group: 'decision',
    sections: [
      {
        heading: 'Method differences',
        html: `<p>Snaking mechanically punches through many clogs. Hydro jetting scours grease and sludge with high-pressure water when the pipe condition supports it.</p>`,
      },
      {
        heading: 'When jetting is not the first step',
        html: `<p>Fragile, collapsed, or poorly accessed lines may need camera inspection before high pressure. Recurring clogs after a snake are a reason to inspect, not a reason to assume jetting is always next. See <a href="/drain-cleaning/">drain cleaning</a> for service options.</p>`,
      },
      {
        heading: 'Kitchen grease vs a single hair clog',
        html: `<p>A bathroom sink that slows after hair buildup often responds to snaking. Restaurant and kitchen lines with grease may need a more thorough clearing method when the pipe can take it. Multiple fixtures backing up at once is more likely a main-line or sewer issue than a job for either method at a single trap.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Is hydro jetting always better?',
        answer:
          'No. Snaking solves many household clogs. Jetting can help with grease and heavy buildup when the pipe condition supports it. The clog and the pipe decide the method.',
      },
    ],
  },
  {
    slug: 'what-to-do-when-a-pipe-bursts',
    title: 'What to Do When a Pipe Bursts | Shutoff Steps',
    description:
      'Step-by-step guidance when a pipe bursts—shut off water, stay safe, and call for emergency plumbing help.',
    h1: 'What to Do When a Pipe Bursts',
    moneyLink: { label: 'Emergency plumber', href: '/emergency-plumber/' },
    group: 'emergency',
    sections: [
      {
        heading: 'Steps',
        html: `<ol><li>Shut off the main water valve</li><li>Open a faucet to relieve pressure if safe</li><li>Keep electricity away from water</li><li>Call for emergency plumbing help</li></ol>
        <p>Valve location help: <a href="/resources/shut-off-main-water-valve/">how to shut off the main water valve</a>. Full safety list: <a href="/resources/emergency-plumbing-checklist/">emergency checklist</a>.</p>`,
      },
      {
        heading: 'If you cannot find the valve',
        html: `<p>Do not stand in water to hunt for a stuck valve. Keep people away from electrical outlets and call (703) 703-7855. We are open 24/7. Do not use the water heater or other appliances sitting in standing water.</p>`,
      },
    ],
    related: [
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Shut off the main valve', href: '/resources/shut-off-main-water-valve/' },
    ],
  },
  {
    slug: 'backflow-testing-virginia-beach',
    title: 'Virginia Beach Backflow Testing | Compliance Guide',
    description:
      'Educational overview of Virginia Beach backflow testing and annual compliance concepts. Cite official city resources.',
    h1: 'Virginia Beach Backflow Testing Guide',
    moneyLink: { label: 'Backflow testing service', href: '/backflow-testing/' },
    group: 'local',
    sections: [
      {
        heading: 'Local compliance',
        html: `<p>Virginia Beach Public Utilities maintains a cross-connection/backflow program. Many assemblies must be tested on a schedule the city publishes — often annually — and results are commonly submitted through the city’s chosen workflow (frequently referenced as SwiftComply). Always verify current rules on official .gov pages rather than relying on a marketing site.</p>
        <p><a href="https://www.vbgov.com/government/departments/public-utilities/" rel="noopener noreferrer" target="_blank">Virginia Beach Public Utilities</a></p>`,
      },
      {
        heading: 'What this guide is (and is not)',
        html: `<p>This page explains the compliance idea so property managers and owners know why they received a testing notice. Booking a test happens on our <a href="/backflow-testing/">backflow testing service</a> page. Official rules live on the city Public Utilities site.</p>`,
      },
    ],
  },
  {
    slug: 'city-vs-private-plumbing-emergency',
    title: 'City vs Private Plumbing Emergency | Virginia Beach',
    description:
      'How to tell a private plumbing failure from a Virginia Beach Public Utilities water or sewer emergency — and who to call first.',
    h1: 'City vs Private Plumbing Emergencies in Virginia Beach',
    moneyLink: { label: 'Emergency plumber', href: '/emergency-plumber/' },
    group: 'emergency',
    sections: [
      {
        heading: 'Why this distinction matters',
        html: `<p>Google’s emergency plumbing results in this market often include city utility pages. That is useful — some problems are municipal, not a private plumber’s to fix. Calling the wrong number delays help.</p>`,
      },
      {
        heading: 'Usually a private plumbing issue',
        html: `<ul>
          <li>Burst pipes inside the home</li>
          <li>Overflowing fixtures or indoor sewage backup from the building lateral</li>
          <li>Major leaks at water heaters, supply lines, or under slabs</li>
          <li>No water caused by a closed valve or failed private piping</li>
        </ul>
        <p>For those, call <a href="/emergency-plumber/">emergency plumbing</a> at (703) 703-7855.</p>`,
      },
      {
        heading: 'Usually a city / utility issue',
        html: `<ul>
          <li>Water main breaks in the street</li>
          <li>Fire hydrant or city-side flooding</li>
          <li>Neighborhood-wide outages affecting many properties</li>
          <li>Problems on the municipal sewer main rather than your private lateral</li>
        </ul>
        <p>Virginia Beach Public Utilities: <a href="https://www.vbgov.com/government/departments/public-utilities/" rel="noopener noreferrer" target="_blank">vbgov.com</a> · 757-385-3111. Confirm current numbers on the official site.</p>`,
      },
      {
        heading: 'When you are unsure',
        html: `<p>If water is actively damaging your home, shut off what you can safely and call a plumber. If the street is flooding from a main, call the city. You will not be penalized for calling both when the source is unclear.</p>`,
      },
    ],
  },
  {
    slug: 'signs-of-sewer-line-problems',
    title: 'Signs of a Sewer Line Problem | Virginia Beach',
    description:
      'Gurgling toilets, multiple backups, sewage odors, and yard clues that a sewer lateral may need camera inspection in Virginia Beach.',
    h1: 'Signs of a Sewer Line Problem',
    moneyLink: { label: 'Sewer line repair', href: '/sewer-line-repair/' },
    group: 'decision',
    sections: [
      {
        heading: 'Symptoms that point beyond one clogged fixture',
        html: `<ul>
          <li>More than one drain backing up at the same time</li>
          <li>Toilet gurgling when a shower or washer runs</li>
          <li>Sewage odor indoors or near the cleanout</li>
          <li>Floor drains overflowing</li>
        </ul>`,
      },
      {
        heading: 'Outdoor clues (not a diagnosis alone)',
        html: `<p>Soggy patches, unusually green strips, or sinkholes over a lateral path can accompany a leaking or broken sewer line. They can also have other causes. Camera inspection is how you confirm.</p>`,
      },
      {
        heading: 'What to do next',
        html: `<p>Stop using water if sewage is entering living space. See <a href="/emergency-plumber/">emergency plumbing</a> for backups. For non-emergency symptoms, request a <a href="/sewer-line-repair/">camera inspection</a>. Compare methods on <a href="/resources/trenchless-vs-traditional-sewer-repair/">trenchless vs traditional repair</a>.</p>`,
      },
    ],
  },
  {
    slug: 'shut-off-main-water-valve',
    title: 'How to Shut Off the Main Water Valve | Safety Steps',
    description:
      'How to find and shut off a home’s main water valve during a leak or burst pipe — then call for plumbing help in Virginia Beach.',
    h1: 'How to Shut Off the Main Water Valve',
    moneyLink: { label: 'Emergency plumber', href: '/emergency-plumber/' },
    group: 'emergency',
    sections: [
      {
        heading: 'Why this matters in an emergency',
        html: `<p>Stopping the water supply limits damage while you wait for help. If you cannot find the valve or it will not turn, call (703) 703-7855 and keep people away from standing water near electricity.</p>`,
      },
      {
        heading: 'Where the valve often is',
        html: `<ul>
          <li>Where the water line enters the house — basement, crawlspace, garage, or utility closet</li>
          <li>Near the water heater or a labeled “main” valve</li>
          <li>In a meter box in the yard (some properties) — use caution lifting lids and never force frozen or rusty valves</li>
        </ul>
        <p>Valve style varies (gate, ball). A quarter-turn ball valve is usually closed when the handle is perpendicular to the pipe.</p>`,
      },
      {
        heading: 'After the water is off',
        html: `<p>Open a faucet to relieve pressure if it is safe. Then follow the <a href="/resources/what-to-do-when-a-pipe-bursts/">burst pipe steps</a> or the <a href="/resources/emergency-plumbing-checklist/">emergency checklist</a> and call.</p>`,
      },
    ],
  },
  {
    slug: 'coastal-plumbing-challenges-virginia-beach',
    title: 'Coastal Plumbing Challenges in Virginia Beach',
    description:
      'How salt air, humidity, and coastal housing affect pipes, water heaters, and outdoor plumbing in Virginia Beach.',
    h1: 'Coastal Plumbing Challenges in Virginia Beach',
    moneyLink: { label: 'Plumbing services', href: '/plumbing-services/' },
    group: 'local',
    sections: [
      {
        heading: 'What “coastal” actually changes',
        html: `<p>Virginia Beach’s humidity, salt air near the Oceanfront and Sandbridge, and sandy soils accelerate wear that shows up as corrosion, outdoor fixture failure, and moisture problems. A visit is how we see what is happening at a specific property.</p>`,
      },
      {
        heading: 'Where it shows up',
        html: `<ul>
          <li>Exterior hose bibbs, gas connectors, and exposed valves near the ocean</li>
          <li>Water heaters and mechanical rooms in damp garages or closets</li>
          <li>Sewer laterals and older galvanized supply lines in aging housing</li>
          <li>Hospitality properties at the Oceanfront with high fixture turnover — see <a href="/commercial-plumbing/">commercial plumbing</a></li>
        </ul>`,
      },
      {
        heading: 'Useful next pages',
        html: `<p><a href="/repiping/">Repiping</a> for aging supply lines · <a href="/gas-line-services/">gas line services</a> for outdoor piping safety · <a href="/sump-pump/">sump pumps</a> for groundwater · <a href="/leak-detection/">leak detection</a> when moisture appears without an obvious source.</p>`,
      },
    ],
  },
  {
    slug: 'commercial-kitchen-plumbing-checklist',
    title: 'Commercial Kitchen Plumbing Checklist | Virginia Beach',
    description:
      'A practical checklist for Virginia Beach restaurants and commercial kitchens before a plumbing service visit — drains, grease, access, and after-hours notes.',
    h1: 'Commercial Kitchen Plumbing Checklist',
    moneyLink: { label: 'Request commercial service', href: '/commercial-plumbing/' },
    group: 'local',
    sections: [
      {
        heading: 'Before the visit',
        html: `<ul>
          <li>Note which fixtures are slow, backing up, or leaking</li>
          <li>Clear access to floor drains, cleanouts, water heaters, and the grease-related lines you can safely reach</li>
          <li>Share gate codes, dock hours, and manager contact</li>
          <li>Describe whether the kitchen must stay open during service</li>
        </ul>`,
      },
      {
        heading: 'Issues kitchens see often',
        html: `<p>Grease and food solids in floor drains, high-use restroom fixtures, commercial water heaters, and backflow assemblies on the water supply. None of those should be diagnosed from a checklist alone — the list is so the visit starts with the right access and details.</p>`,
      },
      {
        heading: 'After hours',
        html: `<p>We are open 24/7. If a backup is putting the kitchen out of service, call (703) 703-7855. For planned work, use the commercial request form on <a href="/commercial-plumbing/">commercial plumbing</a>.</p>`,
      },
    ],
  },
  {
    slug: 'low-water-pressure',
    title: 'Low Water Pressure | Causes and When to Call a Plumber',
    description:
      'Why water pressure drops in a home — one fixture vs whole-house — and when leak detection or repiping may be the next step in Virginia Beach.',
    h1: 'Low Water Pressure: What It Can Mean',
    moneyLink: { label: 'Leak detection', href: '/leak-detection/' },
    group: 'decision',
    sections: [
      {
        heading: 'One fixture or the whole house?',
        html: `<p>Low pressure at a single faucet is often a clogged aerator, a failing supply stop, or that fixture’s valve. Low pressure everywhere — showers, laundry, and kitchen at once — points farther back: a partially closed main, a failing pressure regulator, mineral buildup, or a leak on the supply side.</p>`,
      },
      {
        heading: 'Clues that it is not “just the showerhead”',
        html: `<ul>
          <li>Pressure dropped suddenly rather than over years</li>
          <li>You hear water running when fixtures are off</li>
          <li>The meter moves with nothing in use</li>
          <li>Water is discolored or rusty on galvanized lines</li>
        </ul>
        <p>Those clues overlap with <a href="/leak-detection/">leak detection</a> and, in older homes, <a href="/repiping/">repiping</a>.</p>`,
      },
      {
        heading: 'What to check before you call',
        html: `<p>Confirm the main valve is fully open. If only one fixture is weak, unscrew the aerator and look for debris — if you are comfortable doing that. Do not force a frozen or corroded valve. If pressure is down throughout the house, skip DIY pipe work and request service.</p>`,
      },
    ],
    faqs: [
      {
        question: 'Can a hidden leak cause low pressure?',
        answer:
          'Yes. A supply leak can steal pressure before water reaches fixtures. It is one possible cause, not the only one — diagnosis still needs a look at the system.',
      },
    ],
    related: [
      { label: 'Leak detection', href: '/leak-detection/' },
      { label: 'Repiping', href: '/repiping/' },
      { label: 'Residential plumbing', href: '/residential-plumbing/' },
    ],
  },
  {
    slug: 'storm-plumbing-prep-virginia-beach',
    title: 'Storm Plumbing Prep in Virginia Beach | Before Heavy Rain',
    description:
      'Practical plumbing prep before heavy rain or coastal storms in Virginia Beach — drains, sump pumps, and when a backup is a plumbing issue versus a city emergency.',
    h1: 'Storm Plumbing Prep in Virginia Beach',
    moneyLink: { label: 'Sump pump services', href: '/sump-pump/' },
    group: 'local',
    sections: [
      {
        heading: 'What this page is for',
        html: `<p>Coastal storms and heavy rain put extra load on drains, laterals, and basement pumps. This is a prep list — not a flood-insurance guide and not a claim that we handle city infrastructure.</p>`,
      },
      {
        heading: 'Before the rain',
        html: `<ul>
          <li>Clear leaves and debris from yard drains and the area around outdoor cleanouts — only if it is safe</li>
          <li>If you have a sump pump, test that it runs and that the discharge path is open. See <a href="/sump-pump/">sump pump services</a></li>
          <li>Know where the main water shutoff is: <a href="/resources/shut-off-main-water-valve/">shutoff steps</a></li>
          <li>Move valuables off basement floors if you already take on water in storms</li>
        </ul>`,
      },
      {
        heading: 'During a backup or flood',
        html: `<p>Sewage in the home is a private plumbing emergency until proven otherwise — limit contact and call. Street flooding from a main or hydrant belongs to Virginia Beach Public Utilities. Sort that distinction here: <a href="/resources/city-vs-private-plumbing-emergency/">city vs private</a>.</p>
        <p>Do not run a shop-vac on sewage. Do not use electrical devices in standing water.</p>`,
      },
    ],
    related: [
      { label: 'Sump pump services', href: '/sump-pump/' },
      { label: 'Emergency plumber', href: '/emergency-plumber/' },
      { label: 'Coastal plumbing notes', href: '/resources/coastal-plumbing-challenges-virginia-beach/' },
    ],
  },
  {
    slug: 'frozen-pipe-prevention-hampton-roads',
    title: 'Frozen Pipe Prevention in Hampton Roads | Virginia Beach',
    description:
      'How to reduce frozen-pipe risk during rare Virginia Beach cold snaps — outdoor hose bibbs, crawlspaces, and what to do if a pipe freezes.',
    h1: 'Frozen Pipe Prevention in Virginia Beach',
    moneyLink: { label: 'Emergency plumber', href: '/emergency-plumber/' },
    group: 'emergency',
    sections: [
      {
        heading: 'Cold snaps are uncommon — pipes still freeze',
        html: `<p>Hampton Roads does not have long winters, but a hard freeze can still burst poorly protected pipes: outdoor hose bibbs, uninsulated crawlspaces, garage walls, and vacant houses with the heat off. Disconnect hoses. Open cabinet doors on exterior-wall sinks during a freeze warning.</p>`,
      },
      {
        heading: 'If a pipe is frozen',
        html: `<p>Do not use an open flame. Warm the area slowly with room air if it is safe. If the pipe has already burst, shut the main and call. Full steps: <a href="/resources/what-to-do-when-a-pipe-bursts/">what to do when a pipe bursts</a>.</p>`,
      },
    ],
  },
];
