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
      // First, set the initial content with proper HTML structure
      const processedContent = content
        .replace(/\n/g, '<br>') // Convert line breaks to HTML
        .replace(/^# (.*$)/gm, '<h1>$1</h1>') // h1 headers
        .replace(/^## (.*$)/gm, '<h2>$1</h2>') // h2 headers
        .replace(/^### (.*$)/gm, '<h3>$1</h3>') // h3 headers
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic text
        .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>') // code blocks
        .replace(/^- (.*$)/gm, '<li>$1</li>') // list items
        .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>') // numbered list items
      
      // Set the processed content first
      containerRef.current.innerHTML = processedContent
      
      // Now process LaTeX patterns in the rendered HTML
      const processLaTeX = () => {
        if (!containerRef.current) return
        
        // Find and replace inline LaTeX: \(...\)
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
            // Replace the LaTeX pattern with the rendered element
            containerRef.current.innerHTML = containerRef.current.innerHTML.replace(match[0], span.outerHTML)
          } catch (error) {
            console.error('Inline LaTeX rendering error:', error)
          }
        }
        
        // Find and replace block LaTeX: \[...\]
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
            // Replace the LaTeX pattern with the rendered element
            containerRef.current.innerHTML = containerRef.current.innerHTML.replace(match[0], div.outerHTML)
          } catch (error) {
            console.error('Block LaTeX rendering error:', error)
          }
        }
      }
      
      // Process LaTeX after a short delay to ensure DOM is ready
      setTimeout(processLaTeX, 100)
    }
  }, [content, theme])

  return (
    <div 
      ref={containerRef} 
      className={`prose prose-lg max-w-none font-sans ${className}`}
    />
  )
}
