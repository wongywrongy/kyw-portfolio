import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Download } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
  lightbox?: boolean
  downloadable?: boolean
}

export default function BlogImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  className = '',
  lightbox = true,
  downloadable = true
}: BlogImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const { theme } = useTheme()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = alt.replace(/\s+/g, '-').toLowerCase() + '.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {/* Main Image */}
      <motion.div 
        className={`relative ${className}`}
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
          
          {/* Overlay with actions - only visible on click */}
          <div className="absolute inset-0 bg-black/0 flex items-center justify-center">
            <div className="flex gap-2">
              {lightbox && (
                <motion.button
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-2 bg-white/90 text-slate-800 rounded-full hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomIn size={20} />
                </motion.button>
              )}
              {downloadable && (
                <motion.button
                  onClick={handleDownload}
                  className="p-2 bg-white/90 text-slate-800 rounded-full hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <motion.p 
            className={`mt-3 text-sm italic text-center ${
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

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close button */}
              <motion.button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-white text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
