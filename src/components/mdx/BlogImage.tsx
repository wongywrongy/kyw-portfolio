import React from 'react'
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

export default function BlogImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  className = ''
}: BlogImageProps) {
  const { theme } = useTheme()

  return (
    <motion.div 
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 400}
          className={`w-full h-auto object-cover ${
            theme === 'light' ? 'border border-slate-200' : 'border border-slate-700'
          }`}
          loading="lazy"
        />
      </div>

      {/* Caption */}
      {caption && (
        <motion.p 
          className={`mt-3 text-sm italic ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-400'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {caption}
        </motion.p>
      )}
    </motion.div>
  )
}
