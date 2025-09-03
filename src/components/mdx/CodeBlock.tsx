import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Download } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  className?: string
}

export default function CodeBlock({ 
  children, 
  language = 'text', 
  filename,
  className = '' 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleDownload = () => {
    const extension = language === 'text' ? 'txt' : language
    const blob = new Blob([children], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || `code.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div 
      className={`my-6 rounded-lg overflow-hidden ${
        theme === 'light' 
          ? 'bg-slate-50 border border-slate-200' 
          : 'bg-slate-800 border border-slate-700'
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      {(filename || language !== 'text') && (
        <div className={`flex items-center justify-between px-4 py-2 ${
          theme === 'light' 
            ? 'bg-slate-100 border-b border-slate-200' 
            : 'bg-slate-700 border-b border-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            {filename && (
              <span className={`text-sm font-mono ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {filename}
              </span>
            )}
            {language !== 'text' && (
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                theme === 'light' 
                  ? 'bg-slate-200 text-slate-700' 
                  : 'bg-slate-600 text-slate-200'
              }`}>
                {language}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleDownload}
              className={`p-1.5 rounded hover:bg-white/20 transition-colors ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Download code"
            >
              <Download size={16} />
            </motion.button>
            
            <motion.button
              onClick={handleCopy}
              className={`p-1.5 rounded hover:bg-white/20 transition-colors ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Copy code"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </motion.button>
          </div>
        </div>
      )}

      {/* Code content */}
      <pre className={`p-4 overflow-x-auto ${
        theme === 'light' ? 'text-slate-800' : 'text-slate-200'
      }`}>
        <code className={`font-mono text-sm leading-relaxed ${language !== 'text' ? `language-${language}` : ''}`}>
          {children}
        </code>
      </pre>
    </motion.div>
  )
}
