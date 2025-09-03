import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface LaTeXProps {
  children: string
  display?: boolean
  className?: string
}

export default function LaTeX({ children, display = false, className = '' }: LaTeXProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [katexReady, setKatexReady] = useState(false)
  const { theme } = useTheme()

  // Check if KaTeX is ready
  useEffect(() => {
    const checkKatex = () => {
      if (typeof window !== 'undefined' && window.katex) {
        setKatexReady(true)
      } else {
        // Retry after a short delay
        setTimeout(checkKatex, 100)
      }
    }
    
    checkKatex()
  }, [])

  useEffect(() => {
    if (katexReady && containerRef.current && !isRendered) {
      setIsLoading(true)
      setHasError(false)
      
      // Add a small delay to ensure KaTeX is fully initialized
      const renderTimer = setTimeout(() => {
        try {
          // Clear any existing content
          containerRef.current!.innerHTML = ''
          
          // Render the LaTeX
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
          
          setIsRendered(true)
          setIsLoading(false)
        } catch (error) {
          console.error('LaTeX rendering error:', error)
          setHasError(true)
          setIsLoading(false)
          
          // Fallback to plain text
          if (containerRef.current) {
            containerRef.current.textContent = children
          }
          setIsRendered(true)
        }
      }, 200)
      
      return () => clearTimeout(renderTimer)
    }
  }, [children, display, theme, isRendered, katexReady])

  // Reset rendering state when content changes
  useEffect(() => {
    setIsRendered(false)
    setIsLoading(true)
    setHasError(false)
  }, [children])

  if (!katexReady) {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{
          color: theme === 'light' ? '#94a3b8' : '#64748b',
          fontStyle: 'italic'
        }}
      >
        Initializing...
      </div>
    )
  }

  if (isLoading) {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{
          color: theme === 'light' ? '#94a3b8' : '#64748b',
          fontStyle: 'italic'
        }}
      >
        Loading...
      </div>
    )
  }

  if (hasError) {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{
          color: theme === 'light' ? '#dc2626' : '#fca5a5',
          fontStyle: 'italic',
          border: `1px solid ${theme === 'light' ? '#fecaca' : '#7f1d1d'}`,
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          backgroundColor: theme === 'light' ? '#fef2f2' : '#450a0a'
        }}
      >
        {children}
      </div>
    )
  }

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
