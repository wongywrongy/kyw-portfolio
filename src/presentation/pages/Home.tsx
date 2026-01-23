/**
 * Home Page Component
 * 
 * This file contains the Home page component that serves as the
 * main landing page with section-based scrolling.
 */

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Linkedin, Github, ChevronDown } from 'lucide-react';
import { ROUTES, TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';
import { useBlog } from '../../shared/useBlog';
import { homeContent } from '../../infrastructure/data/home';

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
  const { filteredPosts } = useBlog();

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
                  className={`leading-relaxed ${index < homeContent.about.paragraphs.length - 1 ? 'mb-4 sm:mb-6' : ''} ${styles.textSecondary}`}
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
            {filteredPosts.slice(0, 3).map((post, index) => {
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
                      {/* Date */}
                      <div className="flex-shrink-0">
                        <div className={`flex items-center gap-2 text-sm ${styles.textMuted}`}>
                          <Calendar size={16} />
                          <span className="whitespace-nowrap">
                            {(() => {
                              const date = new Date(post.date);
                              const day = date.getDate().toString().padStart(2, '0');
                              const month = date.toLocaleDateString('en-US', { month: 'long' });
                              const year = date.getFullYear();
                              return `${month} ${day}, ${year}`;
                            })()}
                          </span>
                        </div>
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
