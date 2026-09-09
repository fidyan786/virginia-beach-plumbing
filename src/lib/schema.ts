import { allServices, siteConfig, schemaTelephone } from '../config/site';

export const PHONE_E164 = schemaTelephone();
export const OPENING_HOURS = 'Mo-Su 00:00-23:59';

export function originFromSite(site: URL | undefined): string {
  return (site?.origin || 'https://example.com').replace(/\/$/, '');
}

export function plumberId(origin: string): string {
  return `${origin}/#plumbing-contractor`;
}

export function websiteId(origin: string): string {
  return `${origin}/#website`;
}

export function areaServedCity() {
  return {
    '@type': 'City',
    name: 'Virginia Beach',
    containedInPlace: { '@type': 'State', name: 'Virginia' },
  };
}

function openingHoursSpec() {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  };
}

/** City/state only — no street address, ratings, or reviews. */
export function plumberContractorNode(origin: string) {
  return {
    '@type': ['Plumber', 'PlumbingContractor', 'LocalBusiness'],
    '@id': plumberId(origin),
    name: siteConfig.brandName,
    url: `${origin}/`,
    telephone: PHONE_E164,
    image: {
      '@type': 'ImageObject',
      url: `${origin}/images/hero-plumbing.jpg`,
      contentUrl: `${origin}/images/hero-plumbing.jpg`,
    },
    openingHours: OPENING_HOURS,
    openingHoursSpecification: openingHoursSpec(),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Virginia Beach',
      addressRegion: 'VA',
      addressCountry: 'US',
    },
    areaServed: areaServedCity(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_E164,
      contactType: 'customer service',
      areaServed: areaServedCity(),
      availableLanguage: 'English',
      hoursAvailable: openingHoursSpec(),
    },
    serviceType: [
      'Emergency plumbing',
      'Drain cleaning',
      'Sewer line repair',
      'Water heater repair',
      'Leak detection',
      'Commercial plumbing',
      'Residential plumbing',
      'Plumbing repair',
    ],
    knowsAbout: [
      'Emergency plumbing',
      'Drain cleaning',
      'Sewer line repair',
      'Trenchless sewer repair',
      'Water heater repair',
      'Leak detection',
      'Slab leak repair',
      'Residential plumbing',
      'Commercial plumbing',
      'Virginia Beach',
    ],
    hasOfferCatalog: offerCatalogNode(origin),
  };
}

export function offerCatalogNode(origin: string) {
  return {
    '@type': 'OfferCatalog',
    name: 'Plumbing services',
    itemListElement: allServices.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        url: `${origin}${service.href}`,
        provider: { '@id': plumberId(origin) },
        areaServed: areaServedCity(),
      },
    })),
  };
}

export function websiteNode(origin: string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(origin),
    name: siteConfig.brandName,
    url: `${origin}/`,
    inLanguage: 'en-US',
    publisher: { '@id': plumberId(origin) },
    about: { '@id': plumberId(origin) },
  };
}

export function webPageNode(
  origin: string,
  opts: { name: string; description: string; path: string; image?: string }
) {
  return {
    '@type': 'WebPage',
    '@id': `${origin}${opts.path}#webpage`,
    url: `${origin}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId(origin) },
    about: { '@id': plumberId(origin) },
    ...(opts.image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: opts.image.startsWith('http') ? opts.image : `${origin}${opts.image}`,
          },
        }
      : {}),
  };
}

export function itemListNode(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function breadcrumbList(origin: string, items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}

export function faqPage(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer.replace(/<[^>]+>/g, ''),
      },
    })),
  };
}

export function serviceNode(
  origin: string,
  opts: { name: string; description: string; urlPath: string }
) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${origin}${opts.urlPath}`,
    areaServed: areaServedCity(),
    provider: { '@id': plumberId(origin) },
    serviceType: 'Plumbing',
  };
}

export function withContext<T extends Record<string, unknown>>(node: T) {
  return { '@context': 'https://schema.org', ...node };
}
