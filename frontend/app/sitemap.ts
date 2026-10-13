import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: site.url, lastModified: now },
    { url: `${site.url}/projects`, lastModified: now },
    { url: `${site.url}/experience`, lastModified: now },
    { url: `${site.url}/mindspace`, lastModified: now },
    ...getPosts().map((p) => ({
      url: `${site.url}/mindspace/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00Z`),
    })),
  ]
}
