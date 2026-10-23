import type { MetadataRoute } from 'next';
import { getProperties } from '@/lib/properties';
import { siteUrl } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties();
  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    ...properties.map((p) => ({
      url: `${siteUrl}/propiedades/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/aviso-de-privacidad`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
