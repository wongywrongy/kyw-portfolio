export interface Hero {
  name: string
  greeting?: string
  tagline?: string
  email?: string
  linkedin?: string
  github?: string
}

export interface WorkExperience {
  _id: string
  company: string
  role: string
  period: string
  description?: string
  order?: number
}

export interface Project {
  _id: string
  title: string
  subtitle: string
  description?: string
  link?: string
  tags?: string[]
  order?: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  date: string
  excerpt: string
  category?: string
  wordCount?: number
  featuredImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  } | null
  content?: Record<string, unknown> & { root?: unknown }
}

export interface SiteSettings {
  siteTitle?: string
  siteDescription?: string
  resumeUrl?: string
}
