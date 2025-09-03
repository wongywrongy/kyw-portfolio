import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
  quality?: 'low' | 'medium' | 'high' | 'original'
  format?: 'jpeg' | 'png' | 'webp' | 'avif'
}

export default React.memo(function BlogImage({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 400, 
  className = '',
  quality = 'high',
  format = 'webp'
}: BlogImageProps) {
  const { theme } = useTheme()

  // Generate Vercel-optimized image URLs
  const optimizedSrc = useMemo(() => {
    // If it's already a full URL (CDN), return as-is
    if (src.startsWith('http')) {
      return src
    }
    
    // For local images, Vercel will automatically optimize them
    // You can add query parameters for more control
    const params = new URLSearchParams()
    if (quality !== 'original') {
      params.set('q', quality === 'high' ? '90' : quality === 'medium' ? '75' : '50')
    }
    if (format !== 'jpeg') {
      params.set('f', format)
    }
    
    const queryString = params.toString()
    return queryString ? `${src}?${queryString}` : src
  }, [src, quality, format])

  // Responsive image sizes for different screen sizes
  const responsiveSrcSet = useMemo(() => {
    if (src.startsWith('http')) {
      return undefined // CDN images handle their own optimization
    }
    
    // Generate responsive srcSet for local images
    const sizes = [400, 800, 1200, 1600, 1920]
    return sizes
      .filter(size => size <= width)
      .map(size => `${src}?w=${size}&q=${quality === 'high' ? '90' : '75'} ${size}w`)
      .join(', ')
  }, [src, width, quality])

  // Memoize styles to prevent unnecessary recalculations
  const imageStyles = useMemo(() => ({
    width: width,
    height: height,
    className: `w-full h-auto object-cover ${
      theme === 'light' ? 'border border-slate-200' : 'border border-slate-700'
    }`
  }), [width, height, theme])

  const captionStyles = useMemo(() => ({
    className: `mt-3 text-sm italic ${
      theme === 'light' ? 'text-slate-600' : 'text-slate-400'
    }`
  }), [theme])

  return (
    <motion.div 
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={optimizedSrc}
          alt={alt}
          width={imageStyles.width}
          height={imageStyles.height}
          className={imageStyles.className}
          loading="lazy"
          srcSet={responsiveSrcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
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
  )
})
