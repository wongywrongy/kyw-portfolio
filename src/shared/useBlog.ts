/**
 * Blog Hook
 * 
 * This file contains the useBlog hook that provides blog-related
 * functionality to React components. It integrates with the BlogService
 * and provides a clean interface for blog operations.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { BlogPost } from './types';
import { BlogService } from '../domain/services/BlogService';
import { BlogRepository } from '../infrastructure/data/BlogRepository';

/**
 * Blog Hook State Interface
 * 
 * Defines the state structure for blog operations
 */
export interface BlogState {
  /** Array of blog posts */
  posts: BlogPost[];
  /** Loading state */
  loading: boolean;
  /** Error message */
  error: string | null;
}

/**
 * Blog Hook Return Type
 * 
 * Defines the return type of the useBlog hook
 */
export interface UseBlogReturn extends BlogState {
  /** All posts (no filtering needed) */
  filteredPosts: BlogPost[];
  /** Function to get post by ID */
  getPostById: (id: number) => Promise<BlogPost | undefined>;
  /** Function to get post by slug */
  getPostBySlug: (slug: string) => Promise<BlogPost | undefined>;
  /** Function to refresh posts */
  refreshPosts: () => Promise<void>;
  /** Function to clear error */
  clearError: () => void;
}

/**
 * Custom hook for blog management
 * 
 * Provides blog state and operations to React components.
 * This hook integrates with the BlogService and BlogRepository
 * to provide blog functionality across the application.
 * 
 * @param initialCategory - Initial category to filter by
 * @returns Blog state and operations
 * 
 * @example
 * ```tsx
 * function BlogIndex() {
 *   const { 
 *     posts, 
 *     categories, 
 *     selectedCategory, 
 *     setSelectedCategory,
 *     filteredPosts,
 *     loading 
 *   } = useBlog();
 *   
 *   return (
 *     <div>
 *       {loading ? <LoadingSpinner /> : (
 *         <BlogGrid posts={filteredPosts} />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBlog(): UseBlogReturn {
  // Initialize services
  const blogRepository = useMemo(() => new BlogRepository(), []);
  const blogService = useMemo(() => new BlogService(blogRepository), [blogRepository]);

  // State management
  const [state, setState] = useState<BlogState>({
    posts: [],
    loading: true,
    error: null,
  });

  /**
   * Load initial blog data
   */
  const loadBlogData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const posts = await blogService.getAllPosts();

      setState(prev => ({
        ...prev,
        posts,
        loading: false,
      }));
    } catch (error) {
      console.error('Error loading blog data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load blog posts',
      }));
    }
  }, [blogService]);

  /**
   * Get post by ID
   */
  const getPostById = useCallback(async (id: number): Promise<BlogPost | undefined> => {
    try {
      return await blogService.getPostById(id);
    } catch (error) {
      console.error('Error getting post by ID:', error);
      setState(prev => ({ ...prev, error: 'Failed to load blog post' }));
      return undefined;
    }
  }, [blogService]);

  /**
   * Get post by slug
   */
  const getPostBySlug = useCallback(async (slug: string): Promise<BlogPost | undefined> => {
    try {
      return await blogService.getPostBySlug(slug);
    } catch (error) {
      console.error('Error getting post by slug:', error);
      setState(prev => ({ ...prev, error: 'Failed to load blog post' }));
      return undefined;
    }
  }, [blogService]);

  /**
   * Refresh posts
   */
  const refreshPosts = useCallback(async () => {
    await loadBlogData();
  }, [loadBlogData]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  /**
   * All posts (no filtering needed)
   */
  const filteredPosts = useMemo(() => {
    return state.posts;
  }, [state.posts]);

  // Load initial data
  useEffect(() => {
    loadBlogData();
  }, [loadBlogData]);

  return {
    ...state,
    filteredPosts,
    getPostById,
    getPostBySlug,
    refreshPosts,
    clearError,
  };
}

