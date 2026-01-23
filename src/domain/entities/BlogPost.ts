/**
 * Blog Post Domain Entity
 * 
 * This file contains the BlogPost domain entity with business logic
 * and validation rules. It represents the core business object for blog posts.
 */

import type { BlogPost as IBlogPost, ContentItem, BlogImage } from '../../shared/types';

/**
 * Blog Post Domain Entity
 * 
 * Represents a blog post with business logic and validation.
 * This is the core domain object that encapsulates all blog post-related
 * business rules and operations.
 */
export class BlogPost implements IBlogPost {
  public readonly id: number;
  public readonly title: string;
  public readonly slug: string;
  public readonly excerpt: string;
  public readonly date: string;
  public readonly readTime: string;
  public readonly content?: ContentItem[];
  public readonly images?: BlogImage[];

  /**
   * Creates a new BlogPost instance
   * 
   * @param data - Raw blog post data
   * @throws {Error} If validation fails
   */
  constructor(data: IBlogPost) {
    this.validateBlogPost(data);
    
    this.id = data.id;
    this.title = data.title.trim();
    this.slug = this.generateSlug(data.slug || data.title);
    this.excerpt = data.excerpt.trim();
    this.date = this.validateDate(data.date);
    this.readTime = data.readTime;
    this.content = data.content || [];
    this.images = data.images || [];
  }

  /**
   * Validates the blog post data
   * 
   * @param data - Blog post data to validate
   * @throws {Error} If validation fails
   */
  private validateBlogPost(data: IBlogPost): void {
    if (!data.id || data.id <= 0) {
      throw new Error('Blog post must have a valid positive ID');
    }

    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Blog post must have a title');
    }

    if (data.title.length > 100) {
      throw new Error('Blog post title cannot exceed 100 characters');
    }

    if (!data.excerpt || data.excerpt.trim().length === 0) {
      throw new Error('Blog post must have an excerpt');
    }

    if (data.excerpt.length > 200) {
      throw new Error('Blog post excerpt cannot exceed 200 characters');
    }


    if (!data.readTime || data.readTime.trim().length === 0) {
      throw new Error('Blog post must have a read time estimate');
    }
  }

  /**
   * Validates and formats the date
   * 
   * @param date - Date string to validate
   * @returns Validated date string
   * @throws {Error} If date is invalid
   */
  private validateDate(date: string): string {
    if (!date || date.trim().length === 0) {
      throw new Error('Blog post must have a publication date');
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error('Date must be in YYYY-MM-DD format');
    }

    // Validate that the date is a valid date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date provided');
    }

    return date;
  }

  /**
   * Generates a URL-friendly slug from a string
   * 
   * @param input - Input string to convert to slug
   * @returns URL-friendly slug
   */
  private generateSlug(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }


  /**
   * Gets the publication date as a Date object
   * 
   * @returns Date object representing the publication date
   */
  public getPublicationDate(): Date {
    return new Date(this.date);
  }

  /**
   * Gets the formatted publication date
   * 
   * @returns Formatted date string (e.g., "January 15, 2024")
   */
  public getFormattedDate(): string {
    return this.getPublicationDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Gets the content items count
   * 
   * @returns Number of content items
   */
  public getContentItemsCount(): number {
    return this.content?.length || 0;
  }

  /**
   * Gets the images count
   * 
   * @returns Number of images
   */
  public getImagesCount(): number {
    return this.images?.length || 0;
  }

  /**
   * Checks if the post has content
   * 
   * @returns True if the post has content items
   */
  public hasContent(): boolean {
    return this.getContentItemsCount() > 0;
  }

  /**
   * Checks if the post has images
   * 
   * @returns True if the post has images
   */
  public hasImages(): boolean {
    return this.getImagesCount() > 0;
  }

  /**
   * Gets content items by type
   * 
   * @param type - Type of content items to filter
   * @returns Array of content items of the specified type
   */
  public getContentItemsByType(type: string): ContentItem[] {
    return this.content?.filter(item => item.type === type) || [];
  }

  /**
   * Converts the entity to a plain object
   * 
   * @returns Plain object representation
   */
  public toJSON(): IBlogPost {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      excerpt: this.excerpt,
      date: this.date,
      readTime: this.readTime,
      content: this.content,
      images: this.images,
    };
  }

  /**
   * Creates a BlogPost instance from plain object data
   * 
   * @param data - Plain object data
   * @returns New BlogPost instance
   */
  public static fromJSON(data: IBlogPost): BlogPost {
    return new BlogPost(data);
  }

  /**
   * Compares two blog posts by publication date (newest first)
   * 
   * @param a - First blog post
   * @param b - Second blog post
   * @returns Comparison result for sorting
   */
  public static compareByDate(a: BlogPost, b: BlogPost): number {
    const dateA = a.getPublicationDate();
    const dateB = b.getPublicationDate();
    return dateB.getTime() - dateA.getTime(); // Newest first
  }

  /**
   * Compares two blog posts by title (alphabetical)
   * 
   * @param a - First blog post
   * @param b - Second blog post
   * @returns Comparison result for sorting
   */
  public static compareByTitle(a: BlogPost, b: BlogPost): number {
    return a.title.localeCompare(b.title);
  }
}
