/**
 * Resume Page Component
 * 
 * This file contains the Resume page component that displays
 * a PDF version of the user's resume.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ASSETS, TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';
import { useThemeClasses } from '../../shared/useTheme';

/**
 * Resume Page Component
 * 
 * A simple page that displays the user's resume as a PDF
 * with proper styling and responsive design.
 * 
 * Features:
 * - PDF display using iframe
 * - Responsive design for all screen sizes
 * - Theme-aware styling
 * - Smooth animations with Framer Motion
 * - Accessibility support
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <Resume />
 * ```
 */
export const Resume: React.FC = () => {
  const { getThemeClasses } = useThemeClasses();

  /**
   * Gets theme-aware styles
   */
  const styles = useMemo(() => ({
    text: getColorClass(COLORS.text.light, COLORS.text.dark),
    textSecondary: getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark),
    container: `${getColorClass(COLORS.cardBg.light, COLORS.cardBg.dark)} border ${getColorClass(COLORS.cardBorder.light, COLORS.cardBorder.dark)}`,
  }), []);

  return (
    <div className={`min-h-screen ${LAYOUT.pagePaddingY} overflow-x-hidden`}>
      <div className={`${LAYOUT.containerMaxWidth} mx-auto ${LAYOUT.pagePaddingX} w-full`}>
        {/* Page Header */}
        <motion.div 
          className={`text-center ${LAYOUT.headerMarginBottom}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className={`${TYPOGRAPHY.h1} font-bold mb-2 ${styles.text}`}>
            Resume
          </h1>
          <p className={`text-sm ${styles.textSecondary}`}>
            View my professional experience and skills
          </p>
        </motion.div>

        <div className={`${getColorClass(COLORS.contentBg.light, COLORS.contentBg.dark)} backdrop-blur-sm ${LAYOUT.contentPadding} shadow-lg border ${getColorClass(COLORS.contentBorder.light, COLORS.contentBorder.dark)} w-full overflow-x-hidden`}>
          {/* Resume Container */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-full overflow-hidden" style={{ aspectRatio: '8.5 / 11', maxHeight: '90vh' }}>
              <iframe
                src={ASSETS.resume}
                className="w-full h-full border-0"
                title="Kyle Wong Resume"
                aria-label="Resume PDF document"
                style={{ minHeight: '400px' }}
              />
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className={`text-xs ${styles.textSecondary}`}>
              <a 
                href={ASSETS.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-c1 hover:text-c2 transition-colors"
              >
                Open in new tab
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
