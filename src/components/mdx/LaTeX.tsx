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
    if (typeof window !== 'undefined' && window.katex) {
      try {
        window.katex.render(children, containerRef.current!, {
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
        // Fallback to plain text
        if (containerRef.current) {
          containerRef.current.textContent = children
        }
      }
    }
  }, [children, display, theme])

  if (display) {
    return (
      <div 
        ref={containerRef} 
        className={`my-6 text-center overflow-x-auto ${className}`}
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
