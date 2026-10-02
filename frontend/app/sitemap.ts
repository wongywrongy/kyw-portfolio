import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date() },
    ...getPosts().map((p) => ({
      url: `${site.url}/mindspace/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00Z`),
    })),
  ]
}
