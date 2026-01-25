/**
 * Blog Post Page Component
 * 
 * This file contains the BlogPost page component that displays
 * individual blog posts with rich content rendering.
 */

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useBlogPost } from '../../infrastructure/cms/hooks';
import { LAYOUT, COLORS, getColorClass, TYPOGRAPHY } from '../../shared/constants';
import ContentRenderer from '../components/ContentRenderer';
import BlogImage from '../components/BlogImage';

/**
 * Blog Image Component for MDX
 * 
 * Component used by MDX for rendering images within blog posts
 */
const BlogImageComponent: React.FC<{
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  quality?: 'low' | 'medium' | 'high' | 'original';
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
}> = (props) => <BlogImage {...props} />;

/**
 * Blog Post Page Component
 * 
 * A comprehensive blog post page that displays individual posts with
 * rich content rendering, metadata, and navigation.
 * 
 * Features:
 * - Rich content rendering with ContentRenderer
 * - Post metadata display (date, read time, category)
 * - Navigation back to blog index
 * - Theme-aware styling
 * - Responsive design
 * - Smooth animations with Framer Motion
 * - Loading and error states
 * - Accessibility support
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <BlogPost />
 * ```
 */
export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug || '');

  React.useEffect(() => {
    console.log('BlogPost state:', { slug, post, loading, error });
  }, [slug, post, loading, error]);


  /**
   * Formats date for display in mm/dd/yy format
   */
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }, []);

  /**
   * Gets theme-aware styles
   */
  const styles = useMemo(() => ({
    text: getColorClass(COLORS.text.light, COLORS.text.dark),
    textSecondary: getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark),
    textMuted: getColorClass(COLORS.textMuted.light, COLORS.textMuted.dark),
    backButton: `${getColorClass('text-slate-600', 'dark:text-slate-400')} ${getColorClass('hover:text-c1', 'dark:hover:text-c1')} ${getColorClass('border-slate-200', 'dark:border-slate-700')} ${getColorClass('hover:border-c1', 'dark:hover:border-c1')}`,
  }), []);

  /**
   * Gets color classes for tag based on color option
   */
  const getTagColorClasses = useCallback((color?: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/50',
      purple: 'bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-400 border border-purple-500/30 dark:border-purple-500/50',
      pink: 'bg-pink-500/20 text-pink-600 dark:bg-pink-500/30 dark:text-pink-400 border border-pink-500/30 dark:border-pink-500/50',
      green: 'bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400 border border-green-500/30 dark:border-green-500/50',
      orange: 'bg-orange-500/20 text-orange-600 dark:bg-orange-500/30 dark:text-orange-400 border border-orange-500/30 dark:border-orange-500/50',
      red: 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400 border border-red-500/30 dark:border-red-500/50',
      teal: 'bg-teal-500/20 text-teal-600 dark:bg-teal-500/30 dark:text-teal-400 border border-teal-500/30 dark:border-teal-500/50',
      indigo: 'bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/30 dark:text-indigo-400 border border-indigo-500/30 dark:border-indigo-500/50',
    };
    
    return colorMap[color || 'blue'] || colorMap.blue;
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c1 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    console.error('Blog post error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load blog post. Check console for details.</p>
          <Link 
            to="/blog" 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${styles.backButton}`}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get featured image
  const featuredImage = post.featuredImage;

  return (
    <div className="min-h-screen">
      {/* Featured Hero Image - Full Width */}
      {featuredImage && (
          <motion.div 
            className="w-full h-[60vh] md:h-[70vh] overflow-hidden"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          <img
            src={featuredImage.url}
            alt={featuredImage.alt || ''}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      )}

      <div className={`${LAYOUT.containerMaxWidth} mx-auto ${LAYOUT.pagePaddingX} ${LAYOUT.pagePaddingY}`}>
        <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
          {/* Post Header - Medium Style */}
          <motion.header 
            className={`mb-8 sm:mb-12 ${featuredImage ? 'mt-0' : 'mt-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Tag */}
            {post.tag?.text && (
              <motion.div
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <span
                  className={`
                    inline-block px-4 py-1.5 text-sm font-semibold rounded-full
                    ${getTagColorClasses(post.tag.color)}
                    transition-all duration-300
                  `}
                >
                  {post.tag.text}
                </span>
              </motion.div>
            )}
            
            {/* Title - Medium Style Typography */}
            <h1 className={`${TYPOGRAPHY.h1} font-bold mb-4 sm:mb-6 leading-tight tracking-tight ${styles.text}`}>
              {post.title}
            </h1>

            {/* Date */}
            <div className={`text-sm ${styles.textMuted} mb-6 sm:mb-8 pb-6 sm:pb-8 border-b ${getColorClass(COLORS.divider.light, COLORS.divider.dark)}`}>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(post.date)}
              </div>
            </div>
          </motion.header>

          {/* Post Content - Medium Style */}
          <motion.article 
            className="max-w-none w-full overflow-x-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {post.content && (
              <ContentRenderer content={post.content} />
            )}
          </motion.article>

          {/* Post Footer */}
          <motion.footer 
            className={`mt-16 pt-8 border-t ${getColorClass(COLORS.divider.light, COLORS.divider.dark)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className={`text-sm ${styles.textMuted}`}>
                Published on {formatDate(post.date)}
              </div>
              
              <Link 
                to="/blog" 
                className={`inline-flex items-center gap-2 ${getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark)} ${getColorClass(COLORS.linkHover.light, COLORS.linkHover.dark)} transition-colors`}
              >
                <ArrowLeft size={16} />
                <span>Back to Blog</span>
              </Link>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
