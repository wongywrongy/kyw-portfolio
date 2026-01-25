/**
 * Home Page Component
 * 
 * This file contains the Home page component that serves as the
 * main landing page with section-based scrolling.
 */

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, ChevronDown } from 'lucide-react';
import { ROUTES, TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';
import { useBlogPosts } from '../../infrastructure/cms/hooks';
import { useHomeContent } from '../../infrastructure/cms/hooks';

/**
 * Home Page Component
 * 
 * The main landing page with section-based scrolling that includes:
 * - Hero section
 * - About section
 * - Blog preview section
 * - Resume section
 * - Contact section
 * 
 * Features:
 * - Section-based smooth scrolling
 * - Responsive design for all screen sizes
 * - Theme-aware styling
 * - Smooth animations with Framer Motion
 * - Accessibility support
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <Home />
 * ```
 */
export const Home: React.FC = () => {
  const { posts: blogPosts, loading: blogLoading, error: blogError } = useBlogPosts();
  const { content: homeContent, loading: homeLoading, error: homeError } = useHomeContent();

  // Debug logging
  React.useEffect(() => {
    console.log('Home page state:', { homeContent, homeLoading, homeError, blogPosts, blogLoading, blogError });
  }, [homeContent, homeLoading, homeError, blogPosts, blogLoading, blogError]);

  /**
   * Scrolls to a section smoothly
   */
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  /**
   * Gets theme-aware styles
   */
  const styles = useMemo(() => ({
    text: getColorClass(COLORS.text.light, COLORS.text.dark),
    textSecondary: getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark),
    textMuted: getColorClass(COLORS.textMuted.light, COLORS.textMuted.dark),
    section: 'min-h-screen py-8 sm:py-12 md:py-20 flex items-center',
    card: `${getColorClass(COLORS.cardBg.light, COLORS.cardBg.dark)} border ${getColorClass(COLORS.cardBorder.light, COLORS.cardBorder.dark)}`,
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
   * Animation variants
   */
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Show loading state or error
  if (homeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c1 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (homeError || !homeContent) {
    console.error('Home content error:', homeError);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load content. Check console for details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative snap-y snap-proximity">
      {/* Hero Section */}
      <section id="hero" className={`${styles.section} px-4 sm:px-6 snap-start snap-always`}>
        <div className="text-center max-w-2xl mx-auto w-full">
          {/* Main Heading with Gradient Text */}
          <motion.h1 
            className={`${TYPOGRAPHY.h1} font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent py-4 sm:py-6 md:py-8 drop-shadow-lg`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {homeContent.hero.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className={`${TYPOGRAPHY.bodyLarge} mb-12 leading-relaxed ${getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark)}`}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {homeContent.hero.description}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className={`flex items-center justify-center ${getColorClass(COLORS.textMuted.light, COLORS.textMuted.dark)} ${COLORS.linkHover.light} ${COLORS.linkHover.dark} transition-colors`}
              whileHover={{ y: 4 }}
              aria-label="Scroll to about section"
            >
              <ChevronDown size={24} className="animate-bounce" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section id="about" className={`min-h-screen ${LAYOUT.pagePaddingY} ${LAYOUT.pagePaddingX} scroll-mt-24 snap-start snap-always`}>
        <div className={`${LAYOUT.containerMaxWidth} mx-auto w-full h-full flex flex-col justify-center`}>
          {/* Section Header */}
          <motion.div 
            className={`text-center ${LAYOUT.headerMarginBottom}`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={`${TYPOGRAPHY.h2} font-bold mb-4 ${styles.text}`}>
              {homeContent.about.title}
            </h2>
          </motion.div>

          <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="prose prose-lg max-w-none"
            >
              {homeContent.about.paragraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  className={`leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl ${index < homeContent.about.paragraphs.length - 1 ? 'mb-4 sm:mb-6' : ''} ${styles.textSecondary}`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section - Medium Style */}
      <section id="blog" className={`min-h-screen ${LAYOUT.pagePaddingY} ${LAYOUT.pagePaddingX} scroll-mt-24 snap-start snap-always`}>
        <div className={`${LAYOUT.containerMaxWidth} mx-auto w-full h-full flex flex-col justify-center`}>
          {/* Section Header */}
          <motion.div 
            className={`text-center ${LAYOUT.headerMarginBottom}`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={`${TYPOGRAPHY.h2} font-bold mb-4 ${styles.text}`}>
              {homeContent.blog.title}
            </h2>
            <p className={`${TYPOGRAPHY.bodyLarge} ${styles.textSecondary}`}>
              {homeContent.blog.subtitle}
            </p>
          </motion.div>

          <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
            {/* Blog Posts - One Line Format */}
            <div className="space-y-4 mb-12">
            {blogPosts.slice(0, 3).map((post, index) => {
              return (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`${ROUTES.BLOG}/${post.slug}`} className="block">
                    <div className={`flex items-center gap-4 p-4 transition-all duration-300 ${getColorClass('hover:bg-slate-100', 'dark:hover:bg-slate-700/50')} hover:translate-x-2`}>
                      {/* Combined Date and Tag */}
                      <div className="flex-shrink-0">
                        {post.tag?.text ? (
                          <div className={`flex items-center gap-2 text-xs px-3 py-1.5 ${getTagColorClasses(post.tag.color)}`}>
                            <span className="text-black dark:text-slate-300 font-medium">{formatDate(post.date)}</span>
                            <span className="font-medium">{post.tag.text}</span>
                          </div>
                        ) : (
                          <div className="text-sm text-black dark:text-slate-300 font-medium">
                            {formatDate(post.date)}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`${TYPOGRAPHY.bodyLarge} font-semibold group-hover:text-c1 transition-colors truncate ${styles.text}`}>
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>

            {/* View All Link */}
            <motion.div
              className="text-center mt-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link 
                to={ROUTES.BLOG}
                className={`${TYPOGRAPHY.caption} ${styles.textSecondary} hover:text-c1 transition-colors`}
              >
                View all posts
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`min-h-screen ${LAYOUT.pagePaddingY} ${LAYOUT.pagePaddingX} scroll-mt-24 snap-start snap-always`}>
        <div className={`${LAYOUT.containerMaxWidth} mx-auto w-full h-full flex flex-col justify-center`}>
          {/* Section Header */}
          <motion.div 
            className={`text-center ${LAYOUT.headerMarginBottom}`}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={`${TYPOGRAPHY.h2} font-bold mb-4 ${styles.text}`}>
              {homeContent.contact.title}
            </h2>
            <p className={`${TYPOGRAPHY.bodyLarge} ${styles.textSecondary}`}>
              {homeContent.contact.subtitle}
            </p>
          </motion.div>

          <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeContent.contact.contacts.map((contactItem, index) => {
              // Map contact labels to icons
              const getIcon = (label: string) => {
                switch (label.toLowerCase()) {
                  case 'email':
                    return Mail;
                  case 'linkedin':
                    return Linkedin;
                  case 'github':
                    return Github;
                  default:
                    return Mail;
                }
              };
              const Icon = getIcon(contactItem.label);
              
              return (
                <motion.article
                  key={contactItem.label}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <a
                    href={contactItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className={`p-6 ${styles.card} transition-all duration-300 ${getColorClass('hover:bg-slate-100', 'dark:hover:bg-slate-700/50')} hover:translate-x-2 h-full`}>
                      <div className="flex items-center justify-center mb-4">
                        <div className={`p-3 rounded-full ${
                          `${getColorClass('bg-slate-100', 'dark:bg-slate-700')} ${getColorClass('text-slate-600', 'dark:text-slate-300')}`
                        }`}>
                          <Icon size={24} />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className={`text-lg font-semibold mb-2 group-hover:text-c1 transition-colors ${styles.text}`}>
                          {contactItem.label}
                        </h3>
                        <p className={`text-sm ${styles.textSecondary}`}>
                          {contactItem.value}
                        </p>
                      </div>
                    </div>
                  </a>
                </motion.article>
              );
            })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
