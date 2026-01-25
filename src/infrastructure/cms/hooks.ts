/**
 * Sanity CMS React Hooks
 * 
 * Custom hooks for fetching content from Sanity CMS at runtime.
 * These hooks fetch data when components mount.
 */

import { useEffect, useState } from 'react';
import client, { urlFor } from './client';
import {
  homeQuery,
  aboutQuery,
  allBlogPostsQuery,
  blogPostBySlugQuery,
  resumeQuery,
  siteSettingsQuery,
} from './queries';
import type { HomeContent } from '../data/home';
import type { AboutSection } from '../../shared/types';
import type { BlogPost } from '../../shared/types';

// Home page content hook
export function useHomeContent() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(homeQuery);
        if (!data) {
          throw new Error('Home page content not found. Please create a Home Page document in Sanity.');
        }
        setContent(data);
      } catch (err) {
        console.error('Error fetching home content:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch home content'));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { content, loading, error };
}

// About page content hook
export function useAboutContent() {
  const [content, setContent] = useState<{ title: string; sections: AboutSection[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(aboutQuery);
        if (!data) {
          throw new Error('About page content not found. Please create an About Page document in Sanity.');
        }
        setContent(data);
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch about content'));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { content, loading, error };
}

// All blog posts hook
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(allBlogPostsQuery);
        
        if (!data || !Array.isArray(data)) {
          setPosts([]);
          return;
        }
        
        // Transform Sanity data to BlogPost format
        const transformedPosts: BlogPost[] = data.map((post: any, index: number) => {
          let featuredImage = undefined;
          if (post.featuredImage?.asset) {
            try {
              featuredImage = {
                url: urlFor(post.featuredImage.asset).url(),
                alt: post.featuredImage.alt || '',
                caption: post.featuredImage.caption,
              };
            } catch (err) {
              console.warn('Error processing featured image for post:', post.title, err);
            }
          }
          
          return {
            id: index + 1,
            title: post.title,
            slug: post.slug?.current || '',
            excerpt: post.excerpt,
            date: post.date,
            readTime: post.readTime || '5 min read',
            featuredImage,
            content: [], // Will be populated when viewing individual post
          };
        });

        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

// Single blog post hook
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);
        // Use parameterized query to prevent injection attacks
        const data = await client.fetch(blogPostBySlugQuery, { slug });

        if (!data) {
          setError(new Error('Post not found'));
          setLoading(false);
          return;
        }

        // Transform Sanity content blocks to BlogPost format
        const transformedContent = (data.content || []).map((block: any) => {
          switch (block.type) {
            case 'text':
              // Preserve line breaks by splitting on double newlines (paragraphs)
              // Single newlines will be handled by CSS white-space
              return { 
                type: 'text', 
                content: block.content || '',
                paragraphs: block.content ? block.content.split(/\n\n+/).filter((p: string) => p.trim()) : []
              };
            case 'heading':
              return { type: 'heading', level: block.level, content: block.content };
            case 'image':
              // Handle image asset - try urlFor first, fallback to direct URL
              let imageUrl = '';
              if (block.image?.asset) {
                try {
                  // If we have _id or _ref, use urlFor for optimization
                  if (block.image.asset._id || block.image.asset._ref) {
                    imageUrl = urlFor(block.image.asset).url();
                  } else if (block.image.asset.url) {
                    // Fallback to direct URL from query
                    imageUrl = block.image.asset.url;
                  }
                } catch (err) {
                  console.warn('Error processing image URL:', err);
                  // Final fallback
                  imageUrl = block.image.asset.url || '';
                }
              }
              
              if (!imageUrl) {
                console.warn('No image URL found for block:', block);
                return null;
              }
              
              return {
                type: 'image',
                src: imageUrl,
                alt: block.image?.alt || '',
                caption: block.image?.caption,
                width: block.image?.width,
                align: block.image?.align,
              };
            case 'code':
              // Use 'code' field from Sanity, fallback to 'content'
              return { 
                type: 'code', 
                language: block.language || 'text', 
                content: block.code || block.content || ''
              };
            case 'latex':
              return { type: 'latex', content: block.content, display: block.display || false };
            case 'list':
              return { 
                type: 'list', 
                ordered: block.ordered || false, 
                items: block.items || [] 
              };
            default:
              console.warn('Unknown block type:', block.type, block);
              return null;
          }
        }).filter(Boolean);

        let featuredImage = undefined;
        if (data.featuredImage?.asset) {
          try {
            featuredImage = {
              url: urlFor(data.featuredImage.asset).url(),
              alt: data.featuredImage.alt || '',
              caption: data.featuredImage.caption,
            };
          } catch (err) {
            console.warn('Error processing featured image:', err);
          }
        }

        const transformedPost: BlogPost = {
          id: 0,
          title: data.title,
          slug: data.slug?.current || slug,
          excerpt: data.excerpt,
          date: data.date,
          readTime: data.readTime || '5 min read',
          featuredImage,
          content: transformedContent,
        };

        setPost(transformedPost);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch blog post'));
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

// Resume hook
export function useResume() {
  const [resume, setResume] = useState<{
    title: string;
    introText?: string;
    pdfUrl: string;
    downloadText: string;
    lastUpdated?: string;
    showLastUpdated?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResume() {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(resumeQuery);
        if (!data) {
          throw new Error('Resume not found. Please create a Resume document in Sanity.');
        }
        if (!data.pdfUrl) {
          throw new Error('Resume PDF not found. Please upload a PDF file in the Resume document.');
        }
        setResume({
          title: data.title,
          introText: data.introText,
          pdfUrl: data.pdfUrl,
          downloadText: data.downloadText || 'Download Resume',
          lastUpdated: data.lastUpdated,
          showLastUpdated: data.showLastUpdated !== false,
        });
      } catch (err) {
        console.error('Error fetching resume:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch resume'));
      } finally {
        setLoading(false);
      }
    }

    fetchResume();
  }, []);

  return { resume, loading, error };
}

// Site settings hook
export function useSiteSettings() {
  const [settings, setSettings] = useState<{
    siteName?: string;
    siteDescription?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon?: string;
    }>;
    footerText?: {
      copyright?: string;
      additionalText?: string;
    };
    navigationLinks?: Array<{
      label: string;
      path: string;
      order?: number;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(siteSettingsQuery);
        // Site settings are optional, so null is acceptable
        setSettings(data || null);
      } catch (err) {
        console.error('Error fetching site settings:', err);
        // Site settings are optional, so we don't set error for missing settings
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
