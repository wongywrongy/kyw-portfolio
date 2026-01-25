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
} from './queries';
import type { HomeContent } from '../data/home';
import type { AboutSection } from '../../shared/types';
import type { BlogPost } from '../../shared/types';

// ============================================================================
// Client-side TTL Cache + In-flight Request Deduplication
// ============================================================================

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Cache: stores successful query results with timestamps
const queryCache = new Map<string, { data: unknown; timestamp: number }>();

// In-flight: tracks ongoing requests to deduplicate concurrent calls
const inflight = new Map<string, Promise<unknown>>();

/**
 * Get cached data if available and not stale
 */
function getCached(key: string): unknown | null {
  const cached = queryCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    if (import.meta.env.DEV) {
      console.debug(`[Sanity Cache] HIT: ${key}`);
    }
    return cached.data;
  }
  if (import.meta.env.DEV && cached) {
    console.debug(`[Sanity Cache] MISS (stale): ${key}`);
  } else if (import.meta.env.DEV) {
    console.debug(`[Sanity Cache] MISS: ${key}`);
  }
  return null;
}

/**
 * Set cached data with current timestamp
 */
function setCached(key: string, data: unknown): void {
  queryCache.set(key, { data, timestamp: Date.now() });
}

/**
 * Fetch with caching and deduplication
 */
async function fetchWithCache<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  // Check cache first
  const cached = getCached(cacheKey);
  if (cached !== null) {
    return cached as T;
  }

  // Check if request is already in-flight
  const existingPromise = inflight.get(cacheKey);
  if (existingPromise) {
    if (import.meta.env.DEV) {
      console.debug(`[Sanity Cache] In-flight DEDUP: ${cacheKey}`);
    }
    return existingPromise as Promise<T>;
  }

  // Create new fetch promise
  const promise = fetchFn()
    .then((data) => {
      setCached(cacheKey, data);
      return data;
    })
    .finally(() => {
      // Always remove from in-flight map, even on error
      inflight.delete(cacheKey);
    });

  // Track in-flight request
  inflight.set(cacheKey, promise);

  return promise;
}

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
        
        const data = await fetchWithCache<HomeContent>('homeContent', async () => {
          const result = await client.fetch(homeQuery);
          if (!result) {
            throw new Error('Home page content not found. Please create a Home Page document in Sanity.');
          }
          return result;
        });
        
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
        
        const data = await fetchWithCache<{ title: string; sections: AboutSection[] }>('aboutContent', async () => {
          const result = await client.fetch(aboutQuery);
          if (!result) {
            throw new Error('About page content not found. Please create an About Page document in Sanity.');
          }
          return result;
        });
        
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
        
        const data = await fetchWithCache<any[]>('allBlogPosts', async () => {
          const result = await client.fetch(allBlogPostsQuery);
          if (!result || !Array.isArray(result)) {
            return [];
          }
          return result;
        });
        
        if (!data || data.length === 0) {
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
          
          // Extract preview from contentPreview or excerpt
          let preview = post.excerpt || '';
          if (!preview && post.contentPreview) {
            // Get first 200 characters from content, removing markdown-like formatting
            preview = post.contentPreview
              .replace(/\n+/g, ' ') // Replace newlines with spaces
              .trim()
              .substring(0, 200);
            if (post.contentPreview.length > 200) {
              preview += '...';
            }
          }

          return {
            id: index + 1,
            title: post.title,
            slug: post.slug?.current || '',
            excerpt: preview,
            date: post.date,
            readTime: post.readTime || '5 min read',
            tag: post.tag || undefined,
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
        const data = await fetchWithCache<any>(`blogPostBySlug:${slug}`, async () => {
          const result = await client.fetch(blogPostBySlugQuery, { slug });
          if (!result) {
            throw new Error('Post not found');
          }
          return result;
        });

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
              
              // Debug logging
              console.log('Processing image block:', {
                hasImage: !!block.image,
                hasAsset: !!block.image?.asset,
                asset: block.image?.asset,
                alt: block.alt,
                caption: block.caption,
                fullBlock: block
              });
              
              if (block.image) {
                try {
                  // Try passing the full image object first (urlFor can handle this)
                  if (block.image.asset) {
                    // If we have asset with _id or _ref, use urlFor
                    if (block.image.asset._id || block.image.asset._ref) {
                      imageUrl = urlFor(block.image.asset).url();
                      console.log('Generated image URL via urlFor (asset):', imageUrl);
                    } else {
                      // Try passing the full image object
                      imageUrl = urlFor(block.image).url();
                      console.log('Generated image URL via urlFor (image):', imageUrl);
                    }
                  } else {
                    // Try passing the full image object directly
                    imageUrl = urlFor(block.image).url();
                    console.log('Generated image URL via urlFor (direct):', imageUrl);
                  }
                } catch (err) {
                  console.error('Error processing image URL:', err, {
                    image: block.image,
                    asset: block.image?.asset
                  });
                  // Try alternative approach - construct URL manually if we have _id
                  if (block.image.asset?._id) {
                    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
                    const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
                    const imageId = block.image.asset._id.replace('image-', '').replace(/-/g, '');
                    imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}`;
                    console.log('Using manual CDN URL:', imageUrl);
                  }
                }
              } else {
                console.warn('Image block missing image object:', block);
              }
              
              if (!imageUrl) {
                console.error('No image URL found for block:', block);
                // Return a placeholder instead of null so we can see what's wrong
                return {
                  type: 'image',
                  src: '',
                  alt: block.alt || 'Missing image',
                  caption: block.caption || 'Image failed to load',
                  width: block.width,
                  align: block.align,
                };
              }
              
              return {
                type: 'image',
                src: imageUrl,
                alt: block.alt || '',
                caption: block.caption,
                size: block.size || 'medium',
                width: block.width,
                align: block.align || 'center',
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
          tag: data.tag || undefined,
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
        
        const data = await fetchWithCache<any>('resume', async () => {
          const result = await client.fetch(resumeQuery);
          if (!result) {
            throw new Error('Resume not found. Please create a Resume document in Sanity.');
          }
          if (!result.pdfUrl) {
            throw new Error('Resume PDF not found. Please upload a PDF file in the Resume document.');
          }
          return result;
        });
        
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

