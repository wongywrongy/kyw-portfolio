/**
 * Resume Page Component
 * 
 * This file contains the Resume page component that displays
 * a PDF version of the user's resume.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../../infrastructure/cms/hooks';
import { TYPOGRAPHY, LAYOUT, COLORS, getColorClass } from '../../shared/constants';

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
  const { resume, loading, error } = useResume();

  React.useEffect(() => {
    console.log('Resume state:', { resume, loading, error });
  }, [resume, loading, error]);

  /**
   * Gets theme-aware styles
   */
  const styles = useMemo(() => ({
    text: getColorClass(COLORS.text.light, COLORS.text.dark),
    textSecondary: getColorClass(COLORS.textSecondary.light, COLORS.textSecondary.dark),
    container: `${getColorClass(COLORS.cardBg.light, COLORS.cardBg.dark)} border ${getColorClass(COLORS.cardBorder.light, COLORS.cardBorder.dark)}`,
  }), []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c1 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    console.error('Resume error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load resume. Check console for details.</p>
        </div>
      </div>
    );
  }

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
            {resume.title}
          </h1>
          {resume.introText && (
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${styles.textSecondary}`}>
              {resume.introText}
            </p>
          )}
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
                src={resume.pdfUrl}
                className="w-full h-full border-0"
                title={resume.title}
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
            <p className={`${TYPOGRAPHY.bodySmall} ${styles.textSecondary}`}>
              <a 
                href={resume.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                download
                className="text-c1 hover:text-c2 transition-colors"
              >
                {resume.downloadText}
              </a>
              {resume.showLastUpdated && resume.lastUpdated && (
                <span className="ml-2"> • Last updated: {resume.lastUpdated}</span>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
