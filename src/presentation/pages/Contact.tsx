/**
 * Contact Page Component
 * 
 * This file contains the Contact page component that displays
 * contact information and social links.
 */

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';
import { useHomeContent } from '../../infrastructure/cms/hooks';

/**
 * Contact Page Component
 * 
 * A contact page that displays contact information and social links
 * with animated elements and hover effects.
 * 
 * Features:
 * - Animated contact buttons with hover effects
 * - Social media links with icons
 * - Theme-aware styling
 * - Responsive design
 * - Smooth animations with Framer Motion
 * - Accessibility support
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <Contact />
 * ```
 */
export const Contact: React.FC = () => {
  const { content: homeContent, loading, error } = useHomeContent();

  React.useEffect(() => {
    console.log('Contact page state:', { homeContent, loading, error });
  }, [homeContent, loading, error]);

  /**
   * Map contact labels to icons
   */
  const getIcon = useCallback((label: string) => {
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
  }, []);

  /**
   * Contact information with icons
   */
  const contactInfo = useMemo(() => {
    if (!homeContent?.contact?.contacts) return [];
    return homeContent.contact.contacts.map(contact => ({
      ...contact,
      icon: getIcon(contact.label),
    }));
  }, [homeContent, getIcon]);

  /**
   * Gets theme-aware styles
   */
  const styles = useMemo(() => ({
    text: getColorClass(COLORS.text.light, COLORS.text.dark),
    textSecondary: getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark),
    textMuted: getColorClass(COLORS.textMuted.light, COLORS.textMuted.dark),
    contactCard: `${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`,
    iconContainer: `${getColorClass('bg-slate-100', 'dark:bg-slate-700')} ${getColorClass('text-slate-600', 'dark:text-slate-300')}`,
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
   * Animation variants for individual contact items
   */
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c1 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !homeContent?.contact) {
    console.error('Contact content error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load contact information. Check console for details.</p>
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
            {homeContent.contact.title}
          </h1>
          <p className={`${TYPOGRAPHY.bodyLarge} ${styles.textSecondary}`}>
            {homeContent.contact.subtitle}
          </p>
        </motion.div>

        <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
          {/* Contact Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            
            return (
              <motion.article
                key={contact.label}
                variants={itemVariants}
                className="group"
              >
                <a 
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                  aria-label={contact.description}
                >
                  <div className={`p-6 h-full transition-all duration-300 ${getColorClass('hover:bg-slate-100', 'dark:hover:bg-slate-700/50')} hover:translate-x-2 ${styles.contactCard}`}>
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 rounded-full ${styles.iconContainer}`}>
                        <Icon size={24} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className={`text-lg font-semibold mb-2 group-hover:text-c1 transition-colors ${styles.text}`}>
                        {contact.label}
                      </h3>
                      <p className={`text-sm ${styles.textSecondary}`}>
                        {contact.value}
                      </p>
                      <p className={`text-xs mt-2 ${styles.textMuted}`}>
                        {contact.description}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.article>
            );
          })}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
