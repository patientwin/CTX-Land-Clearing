import { company, migrationInputs } from '@/data/site';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${migrationInputs.newSiteDomain}/#localbusiness`,
    name: company.name,
    telephone: company.phone,
    email: company.email,
    url: migrationInputs.newSiteDomain,
    areaServed: company.serviceAreas,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: company.address.country
    },
    serviceType: ['Land Clearing', 'Forestry Mulching', 'Land Grading']
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType: name,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${migrationInputs.newSiteDomain}/#localbusiness`,
      name: company.name,
      telephone: company.phone
    },
    areaServed: company.serviceAreas
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}
