/**
 * About Page Component
 * 
 * This file contains the About page component that displays
 * personal information in styled content cards.
 */

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { aboutContent } from '../../infrastructure/data/about';
import { AboutContent } from '../../domain/entities/AboutContent';
import { TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';
import BlogImage from '../components/BlogImage';

/**
 * About Page Component
 * 
 * A comprehensive about page that displays personal information
 * in styled content cards with backdrop blur and shadows.
 * 
 * Features:
 * - Styled content cards with white background, shadow, and backdrop blur
 * - Theme-aware styling
 * - Responsive design
 * - Smooth animations with Framer Motion
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <About />
 * ```
 */
export const About: React.FC = () => {

  // Create domain entity for business logic
  const aboutEntity = useMemo(() => 
    AboutContent.fromJSON(aboutContent), 
    []
  );

  /**
   * Gets theme-aware content styles
   */
  const getContentStyles = useCallback(() => {
    return getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark);
  }, []);

  /**
   * Gets theme-aware heading styles
   */
  const getHeadingStyles = useCallback(() => {
    return getColorClass(COLORS.heading.light, COLORS.heading.dark);
  }, []);

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
          <h1 className={`${TYPOGRAPHY.h1} font-bold mb-4 ${getHeadingStyles()}`}>
            {aboutEntity.title}
          </h1>
          <p className={`${TYPOGRAPHY.bodyLarge} ${getContentStyles()}`}>
            Learn more about my background and interests
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)}`}>
            <div className="space-y-12">
              {aboutEntity.sections.map((section, index) => (
                <motion.section
                  key={index}
                  data-section={index}
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                >
                  <h2 className={`${TYPOGRAPHY.h3} font-bold mb-6 ${getHeadingStyles()}`}>
                    {section.title}
                  </h2>
                  
                  <div className={`prose prose-lg max-w-none ${getContentStyles()}`}>
                    <p className="leading-relaxed">
                      {section.content}
                    </p>
                  </div>

                  {/* Images */}
                  {section.images && section.images.length > 0 && (
                    <div className="mt-8 space-y-6">
                      {section.images.map((image, imageIndex) => (
                        <BlogImage
                          key={imageIndex}
                          src={image.src}
                          alt={image.alt}
                          caption={image.caption}
                          width={image.width || 800}
                          height={image.height || 400}
                          quality="high"
                        />
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
