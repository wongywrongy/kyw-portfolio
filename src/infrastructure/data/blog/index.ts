// Import markdown files and parse them
import { parseMarkdownPost } from './MarkdownParser';
import type { BlogPost, BlogImage } from '../../shared/types';

// Re-export types for convenience
export type { BlogPost, BlogImage };

// Automatically import all markdown files from the posts directory
// This allows you to just drop .md files in the posts folder and they'll be automatically included
// No need to manually import each file - just add a new .md file and it will be picked up!
const markdownModules = import.meta.glob<string>('./posts/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
});

// Parse all markdown files to BlogPost format
const allPosts: BlogPost[] = Object.entries(markdownModules).map(([path, content]) => {
  try {
    return parseMarkdownPost(content);
  } catch (error) {
    console.error(`Error parsing markdown file ${path}:`, error);
    // Return a placeholder post to prevent the app from breaking
    const filename = path.split('/').pop()?.replace('.md', '') || 'unknown';
    return {
      id: 0,
      title: `Error loading post: ${filename}`,
      slug: filename,
      excerpt: 'There was an error loading this post.',
      date: new Date().toISOString().split('T')[0],
      readTime: '0 min read',
      content: [{
        type: 'text',
        content: `Error: Could not parse markdown file ${path}. Please check the file format.`
      }]
    } as BlogPost;
  }
}).filter(post => post.id > 0) // Filter out error posts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export { allPosts };

// Helper functions for easy content management
export const getPostById = (id: number): BlogPost | undefined => {
  return allPosts.find(post => post.id === id)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return allPosts.find(post => post.slug === slug)
}
