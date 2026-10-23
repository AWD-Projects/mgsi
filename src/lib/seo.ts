import { site, siteUrl } from './site';
import type { PublicProperty } from './properties';
import { truncate } from './format';

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

export function jsonLd(data: unknown) {
  // Evita cerrar el <script> si algún dato trae "</script>"
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Organización y sitio: van en todas las páginas, con @id estables. Solo datos reales. */
export function baseGraph() {
  const sameAs = Object.values(site.social);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': ORG_ID,
        name: site.name,
        url: siteUrl,
        logo: `${siteUrl}/images/logo-color.svg`,
        image: `${siteUrl}/opengraph-image.jpg`,
        email: site.email,
        telephone: site.phones.map((p) => p.tel),
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: { '@type': 'Country', name: 'México' },
        openingHoursSpecification: site.hours.ranges.map((r) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: r.opens,
          closes: r.closes,
        })),
        sameAs,
        knowsAbout: [
          'Compra y venta de inmuebles',
          'Renta de inmuebles',
          'Administración de propiedades',
          'Asesoría legal inmobiliaria',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: siteUrl,
        name: site.name,
        inLanguage: site.locale,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

/** Portada: la página y la lista de propiedades publicadas. */
export function homePageGraph(properties: PublicProperty[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${site.name} | Compra, venta y renta en CDMX`,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
        inLanguage: site.locale,
      },
      ...(properties.length > 0
        ? [
            {
              '@type': 'ItemList',
              '@id': `${siteUrl}/#propiedades`,
              name: 'Propiedades disponibles',
              itemListElement: properties.slice(0, 20).map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${siteUrl}/propiedades/${p.slug}`,
                name: p.title,
              })),
            },
          ]
        : []),
    ],
  };
}

/** Catálogo (o una de sus páginas): lista de las propiedades que se ven en esa página. */
export function catalogGraph(properties: PublicProperty[], path: string, offset = 0) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}${path}#webpage`,
        url: `${siteUrl}${path}`,
        name: `Propiedades disponibles | ${site.name}`,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
        inLanguage: site.locale,
        ...(properties.length > 0 && {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: properties.map((p, i) => ({
              '@type': 'ListItem',
              position: offset + i + 1,
              url: `${siteUrl}/propiedades/${p.slug}`,
              name: p.title,
            })),
          },
        }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Propiedades', item: `${siteUrl}/propiedades` },
        ],
      },
    ],
  };
}

export function propertyGraph(p: PublicProperty) {
  const url = `${siteUrl}/propiedades/${p.slug}`;
  const offers = [
    p.salePrice > 0 && {
      '@type': 'Offer',
      price: p.salePrice,
      priceCurrency: 'MXN',
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
    },
    p.rentPrice > 0 && {
      '@type': 'Offer',
      price: p.rentPrice,
      priceCurrency: 'MXN',
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
    },
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': `${url}#listing`,
        url,
        name: p.title,
        description: truncate(p.description || p.title, 300),
        image: p.images.slice(0, 6),
        inLanguage: site.locale,
        ...(p.updatedAt && { dateModified: p.updatedAt }),
        ...(offers.length > 0 && { offers }),
        provider: { '@id': ORG_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Propiedades', item: `${siteUrl}/propiedades` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
}
