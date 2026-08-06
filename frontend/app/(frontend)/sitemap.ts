import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/payload'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/work/all', '/projects/all', '/mindspace/all'].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'weekly' as const,
  }))

  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await getBlogPosts()
    postRoutes = posts
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${SITE_URL}/mindspace/${post.slug}`,
        changeFrequency: 'monthly' as const,
      }))
  } catch (error) {
    // A database hiccup should degrade the sitemap, not fail the whole build.
    console.error('Failed to build sitemap post entries:', error)
  }

  return [...staticRoutes, ...postRoutes]
}
