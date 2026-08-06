import { getPayload } from 'payload'
import config from '@payload-config'
import type { Hero, WorkExperience, Project, BlogPost, SiteSettings } from './types'
import type { Media } from '@/payload-types'
import { countWordsFromLexical } from '@/lib/utils/text'
import { safeUrl } from '@/lib/utils/url'

async function getPayloadClient() {
  return getPayload({ config })
}

export async function getHomepageData() {
  const payload = await getPayloadClient()

  const [siteSettingsData, workData, projectsData] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'work-experiences', sort: 'order', limit: 100 }),
    payload.find({ collection: 'projects', sort: 'order', limit: 100 }),
  ])

  const hero: Hero = {
    name: siteSettingsData.hero?.name || '',
    greeting: siteSettingsData.hero?.greeting || "Hey, I'm",
    tagline: siteSettingsData.hero?.tagline || '',
    email: siteSettingsData.links?.email || '',
    linkedin: safeUrl(siteSettingsData.links?.linkedinUrl) || '',
    github: safeUrl(siteSettingsData.links?.githubUrl) || '',
  }

  const siteSettings: SiteSettings = {
    siteTitle: siteSettingsData.site?.siteTitle || '',
    siteDescription: siteSettingsData.site?.siteDescription || '',
    resumeUrl: safeUrl(siteSettingsData.site?.resumeUrl) || '',
  }

  const workExperiences: WorkExperience[] = workData.docs.map((doc) => ({
    _id: String(doc.id),
    company: doc.company,
    role: doc.role,
    period: doc.period,
    description: doc.description || undefined,
    order: doc.order || 0,
  }))

  const projects: Project[] = projectsData.docs.map((doc) => ({
    _id: String(doc.id),
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description || undefined,
    link: safeUrl(doc.link),
    tags: doc.tags?.map((t: { tag: string }) => t.tag) || [],
    order: doc.order || 0,
  }))

  return { hero, workExperiences, projects, siteSettings }
}

function extractFeaturedImage(image: string | Media | null | undefined) {
  if (!image || typeof image === 'string') return null
  return {
    url: image.url || '',
    alt: image.alt || '',
    width: image.width || undefined,
    height: image.height || undefined,
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const payload = await getPayloadClient()

  const data = await payload.find({
    collection: 'posts',
    sort: 'order',
    limit: 100,
    where: {
      status: { equals: 'published' },
    },
  })

  return data.docs.map((doc) => ({
    _id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    date: doc.publishedAt || '',
    excerpt: doc.excerpt,
    category: doc.category || undefined,
    wordCount: countWordsFromLexical(doc.content as Record<string, unknown> | undefined),
    featuredImage: extractFeaturedImage(doc.featuredImage),
    content: doc.content as Record<string, unknown> | undefined,
  }))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient()

  const data = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
  })

  const doc = data.docs[0]
  if (!doc) return null

  return {
    _id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    date: doc.publishedAt || '',
    excerpt: doc.excerpt,
    category: doc.category || undefined,
    wordCount: countWordsFromLexical(doc.content as Record<string, unknown> | undefined),
    featuredImage: extractFeaturedImage(doc.featuredImage),
    content: doc.content as Record<string, unknown> | undefined,
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'site-settings' })

  return {
    siteTitle: data.site?.siteTitle || '',
    siteDescription: data.site?.siteDescription || '',
    resumeUrl: safeUrl(data.site?.resumeUrl) || '',
  }
}

export async function getWorkExperiences(): Promise<WorkExperience[]> {
  const payload = await getPayloadClient()

  const data = await payload.find({
    collection: 'work-experiences',
    sort: 'order',
    limit: 100,
  })

  return data.docs.map((doc) => ({
    _id: String(doc.id),
    company: doc.company,
    role: doc.role,
    period: doc.period,
    description: doc.description || undefined,
    order: doc.order || 0,
  }))
}

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayloadClient()

  const data = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit: 100,
  })

  return data.docs.map((doc) => ({
    _id: String(doc.id),
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description || undefined,
    link: safeUrl(doc.link),
    tags: doc.tags?.map((t: { tag: string }) => t.tag) || [],
    order: doc.order || 0,
  }))
}
