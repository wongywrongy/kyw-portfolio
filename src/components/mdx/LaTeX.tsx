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
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = ''
      
      // Create the LaTeX content with proper delimiters
      if (display) {
        containerRef.current.innerHTML = `\\[${children}\\]`
      } else {
        containerRef.current.innerHTML = `\\(${children}\\)`
      }
      
      // Trigger MathJax to process the new content
      if (typeof window !== 'undefined' && window.MathJax) {
        window.MathJax.typesetPromise([containerRef.current]).catch((err: any) => {
          console.error('MathJax rendering error:', err)
          // Fallback to plain text
          containerRef.current!.textContent = children
        })
      }
    }
  }, [children, display])

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
