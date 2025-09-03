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
}

export default React.memo(function BlogImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  className = ''
}: BlogImageProps) {
  const { theme } = useTheme()

  // Memoize styles to prevent unnecessary recalculations
  const imageStyles = useMemo(() => ({
    width: width || 800,
    height: height || 400,
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
          src={src}
          alt={alt}
          width={imageStyles.width}
          height={imageStyles.height}
          className={imageStyles.className}
          loading="lazy"
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
