/**
 * Blog Index Page Component
 * 
 * Displays a list of blog posts in a simplified format.
 */

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useBlog } from '../../shared/useBlog';
import { BLOG_CONFIG, TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';

/**
 * Blog Index Page Component
 * 
 * Displays blog posts in a simple list format.
 */
export const BlogIndex: React.FC = () => {
  const { 
    posts, 
    filteredPosts,
    loading,
    error 
  } = useBlog();

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
      <div className={`min-h-screen ${LAYOUT.pagePaddingY} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c1 mx-auto mb-4"></div>
          <p className={styles.textSecondary}>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen ${LAYOUT.pagePaddingY} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading blog posts</div>
          <p className={styles.textSecondary}>{error}</p>
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
            {BLOG_CONFIG.title}
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
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={postVariants}
              whileHover="hover"
              className="group"
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="block"
                aria-label={`Read ${post.title}`}
              >
                <motion.div
                  className={`flex items-center gap-4 p-4 transition-all duration-300 ${getColorClass('hover:bg-slate-100', 'dark:hover:bg-slate-700/50')} ${styles.text}`}
                  variants={hoverVariants}
                >
                  {/* Date */}
                  <div className="flex-shrink-0">
                    <div className={`flex items-center gap-2 text-sm ${styles.textMuted}`}>
                      <Calendar size={16} />
                      <span className="whitespace-nowrap">{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h2 className={`${TYPOGRAPHY.bodyLarge} font-semibold group-hover:text-c1 transition-colors truncate ${styles.text}`}>
                      {post.title}
                    </h2>
                  </div>
                </motion.div>
              </Link>
            </motion.article>
          ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={`text-lg ${styles.textSecondary}`}>
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
            <p className={`text-sm ${styles.textMuted}`}>
              Showing {filteredPosts.length} of {posts.length} posts
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
