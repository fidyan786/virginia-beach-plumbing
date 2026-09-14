export type ServiceIconName =
  | 'emergency'
  | 'drain'
  | 'heater'
  | 'sewer'
  | 'leak'
  | 'repair'
  | 'trenchless'
  | 'slab'
  | 'tankless'
  | 'commercial'
  | 'residential'
  | 'repiping'
  | 'gas'
  | 'backflow'
  | 'sump';

export const serviceIconByHref: Record<string, ServiceIconName> = {
  '/emergency-plumber/': 'emergency',
  '/drain-cleaning/': 'drain',
  '/sewer-line-repair/': 'sewer',
  '/trenchless-sewer-repair/': 'trenchless',
  '/leak-detection/': 'leak',
  '/slab-leak-repair/': 'slab',
  '/water-heaters/': 'heater',
  '/tankless-water-heaters/': 'tankless',
  '/commercial-plumbing/': 'commercial',
  '/residential-plumbing/': 'residential',
  '/repiping/': 'repiping',
  '/gas-line-services/': 'gas',
  '/backflow-testing/': 'backflow',
  '/sump-pump/': 'sump',
  '/plumbing-repairs/': 'repair',
};
