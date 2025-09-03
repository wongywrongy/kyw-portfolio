import React, { useEffect, useRef } from 'react'
import { marked } from 'marked'
import { useTheme } from '../../contexts/ThemeContext'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // First, render the markdown to HTML
      const htmlContent = marked(content, {
        breaks: true,
        gfm: true
      })
      
      // Set the markdown-rendered HTML
      containerRef.current.innerHTML = htmlContent
      
      // Now process LaTeX patterns if KaTeX is available
      if (window.katex) {
        const processLaTeX = () => {
          if (!containerRef.current) return
          
          // Process inline LaTeX: \(...\)
          const inlinePattern = /\\\(([^)]+)\\\)/g
          let match
          while ((match = inlinePattern.exec(containerRef.current.innerHTML)) !== null) {
            try {
              const span = document.createElement('span')
              window.katex.render(match[1], span, {
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
              containerRef.current.innerHTML = containerRef.current.innerHTML.replace(match[0], span.outerHTML)
            } catch (error) {
              console.error('Inline LaTeX rendering error:', error)
            }
          }
          
          // Process block LaTeX: \[...\]
          const blockPattern = /\\\[([^\]]+)\\\]/g
          while ((match = blockPattern.exec(containerRef.current.innerHTML)) !== null) {
            try {
              const div = document.createElement('div')
              div.style.textAlign = 'center'
              div.style.margin = '1.5rem 0'
              div.style.overflowX = 'auto'
              div.style.padding = '1rem'
              div.style.backgroundColor = theme === 'light' ? '#f8fafc' : '#1e293b'
              div.style.borderRadius = '0.5rem'
              div.style.border = theme === 'light' ? '1px solid #e2e8f0' : '1px solid #334155'
              
              window.katex.render(match[1], div, {
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
              containerRef.current.innerHTML = containerRef.current.innerHTML.replace(match[0], div.outerHTML)
            } catch (error) {
              console.error('Block LaTeX rendering error:', error)
            }
          }
        }
        
        // Process LaTeX after a short delay
        setTimeout(processLaTeX, 100)
      }
    }
  }, [content, theme])

  return (
    <div 
      ref={containerRef} 
      className={`prose prose-lg max-w-none font-sans ${className}`}
    />
  )
}
