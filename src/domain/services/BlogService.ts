/**
 * Blog Service
 * 
 * This file contains the BlogService domain service that handles
 * business logic related to blog posts and categories.
 */

import type { BlogPost } from '../../shared/types';
import { BlogPost as BlogPostEntity } from '../entities/BlogPost';
import { BLOG_CONFIG } from '../../shared/constants';

/**
 * Blog Service Interface
 * 
 * Defines the contract for blog-related business operations.
 */
export interface IBlogService {
  /**
   * Gets all blog posts
   * @returns Promise resolving to array of blog posts
   */
  getAllPosts(): Promise<BlogPost[]>;

  /**
   * Gets a blog post by ID
   * @param id - Blog post ID
   * @returns Promise resolving to blog post or undefined
   */
  getPostById(id: number): Promise<BlogPost | undefined>;

  /**
   * Gets a blog post by slug
   * @param slug - Blog post slug
   * @returns Promise resolving to blog post or undefined
   */
  getPostBySlug(slug: string): Promise<BlogPost | undefined>;

  /**
   * Gets blog posts by category
   * @param category - Category to filter by
   * @returns Promise resolving to array of blog posts
   */
  getPostsByCategory(category: string): Promise<BlogPost[]>;

  /**
   * Gets all available categories
   * @returns Promise resolving to array of categories
   */
  getCategories(): Promise<BlogCategory[]>;

}

/**
 * Blog Service Implementation
 * 
 * Implements business logic for blog operations including
 * filtering, searching, and content management.
 */
export class BlogService implements IBlogService {
  private readonly blogRepository: IBlogRepository;

  /**
   * Creates a new BlogService instance
   * 
   * @param blogRepository - Repository for blog data access
   */
  constructor(blogRepository: IBlogRepository) {
    this.blogRepository = blogRepository;
  }

  /**
   * Gets all blog posts sorted by date (newest first)
   * 
   * @returns Promise resolving to array of blog posts
   */
  public async getAllPosts(): Promise<BlogPost[]> {
    try {
      const posts = await this.blogRepository.getAllPosts();
      return this.sortPostsByDate(posts);
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw new Error('Failed to fetch blog posts');
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
        throw new Error('Invalid post ID provided');
      }

      const post = await this.blogRepository.getPostById(id);
      return post ? BlogPostEntity.fromJSON(post) : undefined;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw new Error('Failed to fetch blog post');
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
        throw new Error('Invalid post slug provided');
      }

      const post = await this.blogRepository.getPostBySlug(slug.trim());
      return post ? BlogPostEntity.fromJSON(post) : undefined;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw new Error('Failed to fetch blog post');
    }
  }


  /**
   * Sorts blog posts by publication date (newest first)
   * 
   * @param posts - Array of blog posts to sort
   * @returns Sorted array of blog posts
   */
  private sortPostsByDate(posts: BlogPost[]): BlogPost[] {
    return posts
      .map(post => BlogPostEntity.fromJSON(post))
      .sort(BlogPostEntity.compareByDate)
      .map(entity => entity.toJSON());
  }
}

/**
 * Blog Repository Interface
 * 
 * Defines the contract for blog data access operations.
 * This interface abstracts the data layer from the business logic.
 */
export interface IBlogRepository {
  /**
   * Gets all blog posts
   * @returns Promise resolving to array of blog posts
   */
  getAllPosts(): Promise<BlogPost[]>;

  /**
   * Gets a blog post by ID
   * @param id - Blog post ID
   * @returns Promise resolving to blog post or undefined
   */
  getPostById(id: number): Promise<BlogPost | undefined>;

  /**
   * Gets a blog post by slug
   * @param slug - Blog post slug
   * @returns Promise resolving to blog post or undefined
   */
  getPostBySlug(slug: string): Promise<BlogPost | undefined>;
}
