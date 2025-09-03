import React, { useEffect, useRef } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface LaTeXProps {
  children: string
  display?: boolean
  className?: string
}

export default function LaTeX({ children, display = false, className = '' }: LaTeXProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const renderLaTeX = () => {
      if (typeof window !== 'undefined' && window.katex && containerRef.current) {
        try {
          // Clear any existing content
          containerRef.current.innerHTML = ''
          
          // Clean up the LaTeX content - remove any problematic characters
          const cleanContent = children
            .replace(/\\text{([^}]*)}/g, '$1') // Replace \text{} with plain text
            .replace(/\\mathbf{([^}]*)}/g, '\\mathbf{$1}') // Keep \mathbf{} as is
            .trim()
          
          console.log('Rendering LaTeX:', cleanContent) // Debug log
          
          // Render the LaTeX
          window.katex.render(cleanContent, containerRef.current, {
            displayMode: display,
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
        } catch (error) {
          console.error('LaTeX rendering error:', error)
          console.error('Failed content:', children)
          // Fallback to plain text
          if (containerRef.current) {
            containerRef.current.textContent = children
          }
        }
      }
    }

    // Try to render immediately
    renderLaTeX()
    
    // If KaTeX isn't ready yet, wait a bit and try again
    if (typeof window !== 'undefined' && !window.katex) {
      const timer = setTimeout(renderLaTeX, 500)
      return () => clearTimeout(timer)
    }
  }, [children, display, theme])

  if (display) {
    return (
      <div 
        ref={containerRef} 
        className={`my-6 text-center overflow-x-auto ${className}`}
        style={{
          backgroundColor: theme === 'light' ? '#f8fafc' : '#1e293b',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #334155'
        }}
      />
    )
  }

  return (
    <span 
      ref={containerRef} 
      className={`inline-block ${className}`}
    />
  )
}
