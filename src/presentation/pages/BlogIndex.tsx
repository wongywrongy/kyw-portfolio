/**
 * Mindspace Index Page Component
 * 
 * Displays a list of mindspace posts in a simplified format.
 */

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../../infrastructure/cms/hooks';
import { MINDSPACE_CONFIG, TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';

/**
 * Mindspace Index Page Component
 * 
 * Displays mindspace posts in a simple list format.
 */
export const BlogIndex: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();

  React.useEffect(() => {
    console.log('BlogIndex state:', { posts, loading, error });
  }, [posts, loading, error]);

  /**
   * Gets theme-aware styles for various elements
   */
  const getStyles = useCallback(() => ({
    container: `${getColorClass(COLORS.cardBg.light, COLORS.cardBg.dark)} border ${getColorClass(COLORS.cardBorder.light, COLORS.cardBorder.dark)}`,
    text: getColorClass(COLORS.text.light, COLORS.text.dark),
    textSecondary: getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark),
    textMuted: getColorClass(COLORS.textMuted.light, COLORS.textMuted.dark),
    postCard: `${getColorClass(COLORS.cardBg.light, COLORS.cardBg.dark)} border ${getColorClass(COLORS.cardBorder.light, COLORS.cardBorder.dark)} ${getColorClass('hover:border-c1', 'dark:hover:border-c1')}`,
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

  /**
   * Animation variants for the container
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  /**
   * Animation variants for individual posts
   */
  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  /**
   * Animation variants for hover effects
   */
  const hoverVariants = {
    hover: { 
      x: 8,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

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

  // Memoized styles for performance
  const styles = useMemo(() => getStyles(), [getStyles]);

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
  if (error) {
    console.error('Mindspace posts error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load mindspace posts. Check console for details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${LAYOUT.pagePaddingY}`}>
      <div className={`${LAYOUT.containerMaxWidth} mx-auto ${LAYOUT.pagePaddingX}`}>
        {/* Page Header */}
        <motion.div 
          className={`text-center ${LAYOUT.headerMarginBottom}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className={`${TYPOGRAPHY.h1} font-bold mb-4 ${styles.text}`}>
            {MINDSPACE_CONFIG.title}
          </h1>
          <p className={`${TYPOGRAPHY.bodyLarge} ${styles.textSecondary}`}>
            Explore my research, projects, and thoughts
          </p>
        </motion.div>

        <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
          {/* Posts List */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={postVariants}
              whileHover="hover"
              className="group"
            >
              <Link 
                to={`/mindspace/${post.slug}`}
                className="block"
                aria-label={`Read ${post.title}`}
              >
                <motion.div
                  className={`p-4 transition-all duration-300 ${getColorClass('hover:bg-slate-100', 'dark:hover:bg-slate-700/50')} ${styles.text}`}
                  variants={hoverVariants}
                >
                  {/* Combined Date and Tag */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-shrink-0">
                      {post.tag?.text ? (
                        <div className={`flex items-center gap-2 ${TYPOGRAPHY.bodySmall} px-3 py-1.5 ${getTagColorClasses(post.tag.color)}`}>
                          <span className="text-black dark:text-slate-300 font-medium">{formatDate(post.date)}</span>
                          <span className="font-medium">{post.tag.text}</span>
                        </div>
                      ) : (
                        <div className={`${TYPOGRAPHY.bodySmall} text-black dark:text-slate-300 font-medium`}>
                          {formatDate(post.date)}
                        </div>
                      )}
                    </div>

                    {/* Title - Compact and inline */}
                    <h2 className={`${TYPOGRAPHY.bodyLarge} font-semibold group-hover:text-c1 transition-colors flex-1 min-w-0 ${styles.text}`}>
                      {post.title}
                    </h2>
                  </div>

                  {/* Content Preview */}
                  {post.excerpt && (
                    <p className={`${TYPOGRAPHY.bodySmall} ${styles.textMuted} truncate`}>
                      {post.excerpt.length > 150 ? `${post.excerpt.substring(0, 150)}...` : post.excerpt}
                    </p>
                  )}
                </motion.div>
              </Link>
            </motion.article>
          ))}
          </motion.div>

          {/* Empty State */}
          {posts.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={`${TYPOGRAPHY.bodyLarge} ${styles.textSecondary}`}>
                No posts found.
              </div>
            </motion.div>
          )}

          {/* Posts Count */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className={`${TYPOGRAPHY.bodySmall} ${styles.textMuted}`}>
              Showing {posts.length} posts
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
