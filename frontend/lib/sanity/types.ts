import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

// Sanity image asset reference
export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Sanity file asset reference
export interface SanityFileAsset {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
  title?: string
  description?: string
}

// Blog post type
export interface BlogPost {
  _id: string
  title: string
  slug?: { current: string }
  date: string
  excerpt: string
  category?: string
  wordCount?: number
  featuredImage?: SanityImageAsset
  content?: PortableTextBlock[]
  attachments?: SanityFileAsset[]
}

// Work experience type
export interface WorkExperience {
  _id: string
  company: string
  role: string
  period: string
  description?: string
  resume?: SanityFileAsset
  order?: number
}

// Project type
export interface Project {
  _id: string
  title: string
  subtitle: string
  description?: string
  link?: string
  tags?: string[]
  image?: SanityImageAsset
  caseStudy?: SanityFileAsset
  order?: number
}

// Hero section type
export interface Hero {
  _id: string
  name: string
  title?: string
  bio?: string
  email?: string
  github?: string
  linkedin?: string
  twitter?: string
}

// Site settings type
export interface SiteSettings {
  _id: string
  siteTitle: string
  siteDescription: string
  logo?: SanityImageAsset
  favicon?: SanityImageAsset
  ogImage?: SanityImageAsset
  resume?: SanityFileAsset
  documents?: SanityFileAsset[]
}

// Re-export SanityImageSource for urlFor function
export type { SanityImageSource }
