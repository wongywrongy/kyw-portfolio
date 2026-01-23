// Import individual post files
import { post as researchPost1 } from './posts/research/post-1'
import { post as blogPost1 } from './posts/blog/post-1'
import { post as projectPost1 } from './posts/projects/post-1'

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  slug: string
  content?: any[]
  images?: BlogImage[]
}

export interface BlogImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

// Combine all posts from individual files
export const allPosts: BlogPost[] = [
  researchPost1,
  blogPost1,
  projectPost1
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// Helper functions for easy content management
export const getPostById = (id: number): BlogPost | undefined => {
  return allPosts.find(post => post.id === id)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return allPosts.find(post => post.slug === slug)
}
