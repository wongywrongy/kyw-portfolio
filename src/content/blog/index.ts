// Import individual post files
import { post as researchPost1 } from './posts/research/post-1'
import { post as blogPost1 } from './posts/blog/post-1'

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  tags: string[]
  content?: string
}

export interface BlogCategory {
  id: string
  label: string
  icon: string
}

// Combine all posts from individual files
export const allPosts: BlogPost[] = [
  researchPost1,
  blogPost1
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// Categories configuration
export const categories: BlogCategory[] = [
  { id: 'all', label: 'All Posts', icon: 'FileText' },
  { id: 'research', label: 'Research', icon: 'BookOpen' },
  { id: 'blog', label: 'Blog', icon: 'FileText' }
]

// Main blog content object
export const blogContent = {
  title: "My Mind",
  categories,
  posts: allPosts
}

// Helper functions for easy content management
export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') {
    return allPosts
  }
  return allPosts.filter(post => post.category === category)
}

export const getPostById = (id: number): BlogPost | undefined => {
  return allPosts.find(post => post.id === id)
}
