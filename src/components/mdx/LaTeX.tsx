import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface LaTeXProps {
  children: string
  display?: boolean
  className?: string
}

export default function LaTeX({ children, display = false, className = '' }: LaTeXProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  
  // Memoize the LaTeX content to prevent unnecessary re-renders
  const latexContent = useMemo(() => {
    if (display) {
      return `\\[${children}\\]`
    }
    return `\\(${children}\\)`
  }, [children, display])

  // Debounced MathJax processing to avoid excessive calls
  const processMathJax = useCallback(() => {
    if (containerRef.current && typeof window !== 'undefined' && window.MathJax) {
      // Use requestIdleCallback for better performance when browser is idle
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          window.MathJax.typesetPromise([containerRef.current!]).catch((err: any) => {
            console.error('MathJax rendering error:', err)
            if (containerRef.current) {
              containerRef.current.textContent = children
            }
          })
        })
      } else {
        // Fallback to setTimeout for older browsers
        setTimeout(() => {
          window.MathJax.typesetPromise([containerRef.current!]).catch((err: any) => {
            console.error('MathJax rendering error:', err)
            if (containerRef.current) {
              containerRef.current.textContent = children
            }
          })
        }, 0)
      }
    }
  }, [children])

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = ''
      
      // Insert the LaTeX content
      containerRef.current.innerHTML = latexContent
      
      // Process with MathJax
      processMathJax()
    }
  }, [latexContent, processMathJax])

  // Memoize the container styles to prevent unnecessary recalculations
  const containerStyles = useMemo(() => {
    if (display) {
      return {
        backgroundColor: theme === 'light' ? '#f8fafc' : '#1e293b',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #334155'
      }
    }
    return {}
  }, [display, theme])

  if (display) {
    return (
      <div 
        ref={containerRef} 
        className={`my-6 text-center overflow-x-auto ${className}`}
        style={containerStyles}
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
