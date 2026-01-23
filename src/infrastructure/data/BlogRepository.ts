/**
 * Blog Repository
 * 
 * This file contains the BlogRepository implementation that handles
 * data access for blog posts and categories. It implements the
 * repository pattern to abstract data access from business logic.
 */

import type { BlogPost } from '../../shared/types';
import type { IBlogRepository } from '../../domain/services/BlogService';

// Import the actual blog data
import { allPosts } from './blog';

/**
 * Blog Repository Implementation
 * 
 * Implements the IBlogRepository interface to provide data access
 * for blog posts and categories. This implementation uses static
 * TypeScript files as the data source.
 */
export class BlogRepository implements IBlogRepository {
  private readonly posts: BlogPost[];

  /**
   * Creates a new BlogRepository instance
   */
  constructor() {
    this.posts = [...allPosts];
  }

  /**
   * Gets all blog posts
   * 
   * @returns Promise resolving to array of all blog posts
   */
  public async getAllPosts(): Promise<BlogPost[]> {
    try {
      // Return a copy to prevent external modifications
      return [...this.posts];
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      throw new Error('Failed to retrieve blog posts');
    }
  }

  /**
   * Gets a blog post by ID
   * 
   * @param id - Blog post ID
   * @returns Promise resolving to blog post or undefined
   */
  public async getPostById(id: number): Promise<BlogPost | undefined> {
    try {
      if (!id || id <= 0) {
        return undefined;
      }

      return this.posts.find(post => post.id === id);
    } catch (error) {
      console.error('Error in getPostById:', error);
      throw new Error('Failed to retrieve blog post by ID');
    }
  }

  /**
   * Gets a blog post by slug
   * 
   * @param slug - Blog post slug
   * @returns Promise resolving to blog post or undefined
   */
  public async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      if (!slug || slug.trim().length === 0) {
        return undefined;
      }

      const normalizedSlug = slug.trim().toLowerCase();
      return this.posts.find(post => 
        post.slug.toLowerCase() === normalizedSlug
      );
    } catch (error) {
      console.error('Error in getPostBySlug:', error);
      throw new Error('Failed to retrieve blog post by slug');
    }
  }


  /**
   * Gets blog posts by date range
   * 
   * @param startDate - Start date (inclusive)
   * @param endDate - End date (inclusive)
   * @returns Promise resolving to array of blog posts in date range
   */
  public async getPostsByDateRange(startDate: Date, endDate: Date): Promise<BlogPost[]> {
    try {
      return this.posts.filter(post => {
        const postDate = new Date(post.date);
        return postDate >= startDate && postDate <= endDate;
      });
    } catch (error) {
      console.error('Error in getPostsByDateRange:', error);
      throw new Error('Failed to retrieve blog posts by date range');
    }
  }

  /**
   * Gets blog posts with specific tags
   * 
   * @param tags - Array of tags to filter by
   * @returns Promise resolving to array of blog posts with specified tags
   */
  public async getPostsByTags(tags: string[]): Promise<BlogPost[]> {
    try {
      if (!tags || tags.length === 0) {
        return [];
      }

      const normalizedTags = tags.map(tag => tag.toLowerCase().trim());
      
      return this.posts.filter(post => {
        // This would need to be implemented if tags are added to the BlogPost interface
        // For now, return empty array as tags are not currently supported
        return false;
      });
    } catch (error) {
      console.error('Error in getPostsByTags:', error);
      throw new Error('Failed to retrieve blog posts by tags');
    }
  }

  /**
   * Gets the total count of blog posts
   * 
   * @returns Promise resolving to total post count
   */
  public async getPostCount(): Promise<number> {
    try {
      return this.posts.length;
    } catch (error) {
      console.error('Error in getPostCount:', error);
      throw new Error('Failed to get blog post count');
    }
  }


  /**
   * Gets posts sorted by a specific field
   * 
   * @param field - Field to sort by
   * @param direction - Sort direction ('asc' or 'desc')
   * @returns Promise resolving to sorted array of blog posts
   */
  public async getPostsSortedBy(field: 'date' | 'title' | 'category', direction: 'asc' | 'desc' = 'desc'): Promise<BlogPost[]> {
    try {
      const posts = [...this.posts];
      
      posts.sort((a, b) => {
        let comparison = 0;
        
        switch (field) {
          case 'date':
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            break;
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
        }
        
        return direction === 'desc' ? -comparison : comparison;
      });
      
      return posts;
    } catch (error) {
      console.error('Error in getPostsSortedBy:', error);
      throw new Error('Failed to get sorted blog posts');
    }
  }
}
