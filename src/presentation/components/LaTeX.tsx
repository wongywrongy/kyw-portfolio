/**
 * LaTeX Component
 * 
 * This file contains the LaTeX component for rendering
 * mathematical expressions using MathJax with performance
 * optimizations and theme integration.
 */

import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import type { LaTeXProps } from '../../shared/types';
import { useThemeClasses } from '../../shared/useTheme';

/**
 * MathJax Window Interface
 * 
 * Extends the Window interface to include MathJax types
 */
declare global {
  interface Window {
    MathJax?: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
      startup?: {
        ready: () => Promise<void>;
      };
    };
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  }
}

/**
 * LaTeX Component
 * 
 * A sophisticated component for rendering LaTeX mathematical expressions
 * using MathJax with performance optimizations and theme integration.
 * 
 * Features:
 * - Inline and display math rendering
 * - MathJax integration with fallbacks
 * - Performance optimization with requestIdleCallback
 * - Theme-aware styling
 * - Error handling and graceful degradation
 * - Accessibility support
 * 
 * @param props - LaTeX component props
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * // Inline math
 * <LaTeX display={false}>E = mc^2</LaTeX>
 * 
 * // Display math
 * <LaTeX display={true}>
 *   x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
 * </LaTeX>
 * ```
 */
export const LaTeX: React.FC<LaTeXProps> = ({ 
  children, 
  display = false, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getThemeClasses } = useThemeClasses();
  
  // Track if MathJax is loaded and ready
  const [mathJaxReady, setMathJaxReady] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  /**
   * Memoized LaTeX content with proper delimiters
   */
  const latexContent = useMemo(() => {
    if (!children || children.trim().length === 0) {
      return '';
    }

    // Add proper LaTeX delimiters
    if (display) {
      return `\\[${children}\\]`;
    }
    return `\\(${children}\\)`;
  }, [children, display]);

  /**
   * Debounced MathJax processing for performance
   */
  const processMathJax = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined' || !window.MathJax) {
      return;
    }

    try {
      // Use requestIdleCallback for better performance when browser is idle
      const processWithMathJax = () => {
        if (!containerRef.current || !window.MathJax) {
          return;
        }

        window.MathJax.typesetPromise([containerRef.current])
          .then(() => {
            setRenderError(null);
          })
          .catch((error: Error) => {
            console.error('MathJax rendering error:', error);
            setRenderError('Failed to render mathematical expression');
            
            // Fallback: display raw LaTeX
            if (containerRef.current) {
              containerRef.current.textContent = children;
            }
          });
      };

      if (window.requestIdleCallback) {
        window.requestIdleCallback(processWithMathJax, { timeout: 1000 });
      } else {
        // Fallback to setTimeout for older browsers
        setTimeout(processWithMathJax, 0);
      }
    } catch (error) {
      console.error('Error processing MathJax:', error);
      setRenderError('Error processing mathematical expression');
    }
  }, [children]);

  /**
   * Loads MathJax if not already loaded
   */
  const loadMathJax = useCallback(() => {
    if (typeof window === 'undefined' || window.MathJax) {
      setMathJaxReady(true);
      return;
    }

    // Create script element for MathJax
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
    script.async = true;
    script.onload = () => {
      const mathJaxScript = document.createElement('script');
      mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      mathJaxScript.async = true;
      mathJaxScript.onload = () => {
        if (window.MathJax) {
          window.MathJax.startup = {
            ready: () => {
              setMathJaxReady(true);
              return Promise.resolve();
            }
          };
        }
      };
      document.head.appendChild(mathJaxScript);
    };
    document.head.appendChild(script);
  }, []);

  /**
   * Memoized container styles based on display mode and theme
   */
  const containerStyles = useMemo(() => {
    if (display) {
      return {
        padding: '1.5rem',
        borderRadius: '0.5rem',
      };
    }
    return {};
  }, [display]);

  // Load MathJax on component mount
  useEffect(() => {
    loadMathJax();
  }, [loadMathJax]);

  // Process LaTeX when content changes or MathJax becomes ready
  useEffect(() => {
    if (!latexContent || !mathJaxReady) {
      return;
    }

    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      // Insert the LaTeX content
      containerRef.current.innerHTML = latexContent;
      
      // Process with MathJax
      processMathJax();
    }
  }, [latexContent, mathJaxReady, processMathJax]);

  // Render error state
  if (renderError) {
    return (
      <div className={`${className} ${display ? 'my-6' : 'inline'}`}>
        <div className={`
          ${display ? 'p-4 rounded-lg' : 'inline-block'}
          ${getThemeClasses(
            'bg-red-50 border border-red-200 text-red-700',
            'bg-red-900/20 border border-red-800 text-red-400'
          )}
        `}>
          <span className="text-sm">
            {renderError}
          </span>
          {children && (
            <div className="mt-2 font-mono text-xs">
              Raw: {children}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render loading state
  if (!mathJaxReady) {
    return (
      <div className={`${className} ${display ? 'my-6' : 'inline'}`}>
        <div className={`
          ${display ? 'p-4 rounded-lg' : 'inline-block'}
          ${getThemeClasses(
            'bg-slate-50 border border-slate-200 text-slate-600',
            'bg-slate-800 border border-slate-700 text-slate-400'
          )}
        `}>
          <span className="text-sm animate-pulse">
            Loading mathematical expression...
          </span>
        </div>
      </div>
    );
  }

  // Render LaTeX content
  if (display) {
    return (
      <div 
        ref={containerRef} 
        className={`my-8 w-full text-center overflow-x-auto ${getThemeClasses('bg-slate-50 dark:bg-slate-900/50', 'bg-slate-900/50')} rounded-lg border ${getThemeClasses('border-slate-200', 'border-slate-700')} py-6 px-4 ${className}`}
        style={containerStyles}
        role="math"
        aria-label={`Mathematical expression: ${children}`}
      />
    );
  }

  return (
    <span 
      ref={containerRef} 
      className={`inline-block ${className}`}
      role="math"
      aria-label={`Mathematical expression: ${children}`}
    />
  );
};

/**
 * Inline Math Component
 * 
 * Convenience component for inline mathematical expressions.
 * 
 * @param props - LaTeX component props (without display)
 * @returns JSX element
 */
export const InlineMath: React.FC<Omit<LaTeXProps, 'display'>> = (props) => (
  <LaTeX {...props} display={false} />
);

/**
 * Display Math Component
 * 
 * Convenience component for displayed mathematical expressions.
 * 
 * @param props - LaTeX component props (without display)
 * @returns JSX element
 */
export const DisplayMath: React.FC<Omit<LaTeXProps, 'display'>> = (props) => (
  <LaTeX {...props} display={true} />
);

export default LaTeX;
