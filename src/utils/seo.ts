import { migrationInputs } from '@/data/site';

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  canonicalOverride?: string;
};

export function absoluteUrl(path: string) {
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return new URL(normalized, migrationInputs.newSiteDomain).toString();
}

export function seo(config: SeoConfig) {
  return {
    ...config,
    canonical: config.canonicalOverride || absoluteUrl(config.path),
    image: config.image ? absoluteUrl(config.image) : absoluteUrl('/images/og-default.svg')
  };
}

export function breadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}
