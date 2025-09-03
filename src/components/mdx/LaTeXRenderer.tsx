import React, { useEffect, useRef } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface LaTeXRendererProps {
  content: string
  className?: string
}

export default function LaTeXRenderer({ content, className = '' }: LaTeXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.katex && containerRef.current) {
      // Parse the content and replace LaTeX patterns
      let processedContent = content
      
      // Replace inline LaTeX: \(...\)
      processedContent = processedContent.replace(/\\\(([^)]+)\\\)/g, (match, latex) => {
        try {
          const span = document.createElement('span')
          window.katex.render(latex, span, {
            displayMode: false,
            throwOnError: false,
            errorColor: theme === 'light' ? '#dc2626' : '#fca5a5',
            macros: {
              "\\RR": "\\mathbb{R}",
              "\\NN": "\\mathbb{N}",
              "\\ZZ": "\\mathbb{Z}",
              "\\QQ": "\\mathbb{Q}",
              "\\CC": "\\mathbb{C}"
            }
          })
          return span.outerHTML
        } catch (error) {
          console.error('LaTeX rendering error:', error)
          return match
        }
      })
      
      // Replace block LaTeX: \[...\]
      processedContent = processedContent.replace(/\\\[([^\]]+)\\\]/g, (match, latex) => {
        try {
          const div = document.createElement('div')
          div.style.textAlign = 'center'
          div.style.margin = '1.5rem 0'
          div.style.overflowX = 'auto'
          window.katex.render(latex, div, {
            displayMode: true,
            throwOnError: false,
            errorColor: theme === 'light' ? '#dc2626' : '#fca5a5',
            macros: {
              "\\RR": "\\mathbb{R}",
              "\\NN": "\\mathbb{N}",
              "\\ZZ": "\\mathbb{Z}",
              "\\QQ": "\\mathbb{Q}",
              "\\CC": "\\mathbb{C}"
            }
          })
          return div.outerHTML
        } catch (error) {
          console.error('LaTeX rendering error:', error)
          return match
        }
      })
      
      // Set the processed content
      containerRef.current.innerHTML = processedContent
    }
  }, [content, theme])

  return (
    <div 
      ref={containerRef} 
      className={`prose prose-lg max-w-none font-sans ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
