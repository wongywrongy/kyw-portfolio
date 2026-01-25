/**
 * CMS Data Hooks
 * 
 * These hooks load data from build-time generated JSON files.
 * Data is fetched at build time to avoid CORS issues.
 */

import { useEffect, useState } from 'react';
import { urlFor } from './client';
import type { HomeContent } from '../data/home';
import type { AboutSection } from '../../shared/types';
import type { BlogPost } from '../../shared/types';

// Import build-time generated data
import homeData from '../data/cms/home.json';
import aboutData from '../data/cms/about.json';
import blogPostsData from '../data/cms/blogPosts.json';
import resumeData from '../data/cms/resume.json';
import siteSettingsData from '../data/cms/siteSettings.json';

// Home page content hook
export function useHomeContent() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      // Use build-time data
      const data = homeData as any;
      if (!data) {
        throw new Error('Home page content not found. Please run npm run build to fetch data from Sanity.');
      }
      setContent(data);
    } catch (err) {
      console.error('Error loading home content:', err);
      setError(err instanceof Error ? err : new Error('Failed to load home content'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { content, loading, error };
}

// About page content hook
export function useAboutContent() {
  const [content, setContent] = useState<{ title: string; sections: AboutSection[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      // Use build-time data
      const data = aboutData as any;
      if (!data) {
        throw new Error('About page content not found. Please run npm run build to fetch data from Sanity.');
      }
      setContent(data);
    } catch (err) {
      console.error('Error loading about content:', err);
      setError(err instanceof Error ? err : new Error('Failed to load about content'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { content, loading, error };
}

// All blog posts hook
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      // Use build-time data
      const data = blogPostsData as any[];
      
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
      console.error('Error loading blog posts:', err);
      setError(err instanceof Error ? err : new Error('Failed to load blog posts'));
      setPosts([]);
    } finally {
      setLoading(false);
    }
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

    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load from build-time data
        let data: any = null;
        try {
          // Dynamic import for the specific blog post
          const postModule = await import(`../data/cms/blogPosts/${slug}.json`);
          data = postModule.default || postModule;
        } catch (importError) {
          // If file doesn't exist, try to find it in the blogPosts array
          const allPosts = blogPostsData as any[];
          const foundPost = allPosts.find((p: any) => p.slug?.current === slug);
          if (foundPost) {
            data = foundPost;
          }
        }

        if (!data) {
          setError(new Error('Post not found'));
          setLoading(false);
          return;
        }

        // Transform Sanity content blocks to BlogPost format
        const transformedContent = (data.content || []).map((block: any) => {
          switch (block.type) {
            case 'text':
              return { type: 'text', content: block.content };
            case 'heading':
              return { type: 'heading', level: block.level, content: block.content };
            case 'image':
              return {
                type: 'image',
                url: urlFor(block.image.asset).url(),
                alt: block.image.alt || '',
                caption: block.image.caption,
                width: block.image.width,
                align: block.image.align,
              };
            case 'code':
              return { type: 'code', language: block.language, code: block.code };
            case 'latex':
              return { type: 'latex', content: block.content, display: block.display };
            case 'list':
              return { type: 'list', ordered: block.ordered, items: block.items };
            default:
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
        console.error('Error loading blog post:', err);
        setError(err instanceof Error ? err : new Error('Failed to load blog post'));
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
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
    try {
      setLoading(true);
      setError(null);
      // Use build-time data
      const data = resumeData as any;
      if (!data) {
        throw new Error('Resume not found. Please run npm run build to fetch data from Sanity.');
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
      console.error('Error loading resume:', err);
      setError(err instanceof Error ? err : new Error('Failed to load resume'));
    } finally {
      setLoading(false);
    }
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
    try {
      setLoading(true);
      setError(null);
      // Use build-time data (optional, so null is acceptable)
      const data = siteSettingsData as any;
      setSettings(data || null);
    } catch (err) {
      console.error('Error loading site settings:', err);
      // Site settings are optional, so we don't set error for missing settings
      setSettings(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { settings, loading, error };
}
