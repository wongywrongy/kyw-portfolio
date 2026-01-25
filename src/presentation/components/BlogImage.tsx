/**
 * Blog Image Component
 * 
 * This file contains the BlogImage component for displaying
 * optimized images in blog posts with responsive loading and
 * performance optimizations.
 */

import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { BlogImageProps } from '../../shared/types';
import { useThemeClasses } from '../../shared/useTheme';

/**
 * Image Quality Configuration
 * 
 * Maps quality settings to numeric values for optimization
 */
const QUALITY_MAP = {
  low: 50,
  medium: 75,
  high: 90,
  original: 100,
} as const;

/**
 * Blog Image Component
 * 
 * A sophisticated image component that provides responsive loading,
 * optimization, and accessibility features for blog post images.
 * 
 * Features:
 * - Responsive image loading with srcSet
 * - Lazy loading for performance
 * - Image optimization with quality settings
 * - Theme-aware styling
 * - Accessibility support
 * - Error handling and fallbacks
 * 
 * @param props - BlogImage component props
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <BlogImage
 *   src="/path/to/image.jpg"
 *   alt="Descriptive alt text"
 *   caption="Optional caption"
 *   width={800}
 *   height={400}
 *   quality="high"
 *   format="webp"
 * />
 * ```
 */
export const BlogImage: React.FC<BlogImageProps> = ({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 400, 
  className = '',
  quality = 'high',
  format = 'webp'
}) => {
  const { getThemeClasses } = useThemeClasses();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Debug logging
  React.useEffect(() => {
    if (!src) {
      console.error('BlogImage: Missing src prop', { src, alt, caption });
    } else {
      console.log('BlogImage: Rendering image', { src: src.substring(0, 100), alt, caption });
    }
  }, [src, alt, caption]);

  /**
   * Generates optimized image source URL
   * Handles both local images and external CDN images
   */
  const optimizedSrc = useMemo(() => {
    // If it's already a full URL (CDN), return as-is
    if (src.startsWith('http')) {
      return src;
    }
    
    // For local images, add optimization parameters
    const params = new URLSearchParams();
    
    if (quality !== 'original') {
      params.set('q', String(QUALITY_MAP[quality]));
    }
    
    if (format !== 'jpeg') {
      params.set('f', format);
    }
    
    const queryString = params.toString();
    return queryString ? `${src}?${queryString}` : src;
  }, [src, quality, format]);

  /**
   * Generates responsive srcSet for different screen sizes
   */
  const responsiveSrcSet = useMemo(() => {
    if (src.startsWith('http')) {
      return undefined; // CDN images handle their own optimization
    }
    
    // Generate responsive srcSet for local images
    const sizes = [400, 800, 1200, 1600, 1920];
    return sizes
      .filter(size => size <= width)
      .map(size => {
        const qualityValue = QUALITY_MAP[quality];
        return `${src}?w=${size}&q=${qualityValue} ${size}w`;
      })
      .join(', ');
  }, [src, width, quality]);

  /**
   * Handles image load completion
   */
  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  /**
   * Handles image load errors
   */
  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  /**
   * Gets theme-aware image styles
   */
  const imageStyles = useMemo(() => ({
    width: width,
    height: height,
    className: `w-full h-auto object-cover ${
      getThemeClasses('border border-slate-200', 'border border-slate-700')
    }`
  }), [width, height, getThemeClasses]);

  /**
   * Gets theme-aware caption styles
   */
  const captionStyles = useMemo(() => ({
    className: `mt-3 text-sm italic ${
      getThemeClasses('text-slate-600', 'text-slate-400')
    }`
  }), [getThemeClasses]);

  // Render error state
  if (imageError) {
    return (
      <motion.div 
        className={`text-center ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={`
          w-full h-48 
          ${getThemeClasses(
            'bg-slate-100 border border-slate-300',
            'bg-slate-800 border border-slate-600'
          )}
          rounded-lg flex items-center justify-center
        `}>
          <div className="text-center">
            <p className={`
              text-sm 
              ${getThemeClasses('text-slate-600', 'text-slate-400')}
            `}>
              Failed to load image
            </p>
            {alt && (
              <p className={`
                text-xs mt-1 
                ${getThemeClasses('text-slate-500', 'text-slate-500')}
              `}>
                {alt}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`text-center w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
        {/* Loading State */}
        {imageLoading && (
          <div className={`
            absolute inset-0 
            ${getThemeClasses(
              'bg-slate-100 border border-slate-300',
              'bg-slate-800 border border-slate-600'
            )}
            rounded-lg flex items-center justify-center z-10
          `}>
            <div className="animate-pulse">
              <div className={`
                w-8 h-8 rounded-full 
                ${getThemeClasses('bg-slate-300', 'bg-slate-600')}
              `} />
            </div>
          </div>
        )}

        {/* Image */}
        <img
          src={optimizedSrc}
          alt={alt}
          width={imageStyles.width}
          height={imageStyles.height}
          className={`${imageStyles.className} max-w-full h-auto`}
          loading="lazy"
          srcSet={responsiveSrcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          style={{
            opacity: imageLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      </div>

      {/* Caption */}
      {caption && (
        <motion.p 
          className={captionStyles.className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {caption}
        </motion.p>
      )}
    </motion.div>
  );
};

export default BlogImage;
