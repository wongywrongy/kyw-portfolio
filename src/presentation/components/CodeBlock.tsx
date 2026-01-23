/**
 * Code Block Component
 * 
 * This file contains the CodeBlock component for displaying
 * syntax-highlighted code with interactive features like
 * copy to clipboard and download functionality.
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download } from 'lucide-react';
import type { CodeBlockProps } from '../../shared/types';
import { useThemeClasses } from '../../shared/useTheme';

/**
 * Code Block Component
 * 
 * A sophisticated code display component that provides syntax highlighting,
 * copy to clipboard, download functionality, and theme-aware styling.
 * 
 * Features:
 * - Syntax highlighting with language detection
 * - Copy to clipboard functionality
 * - Download code as file
 * - Filename display
 * - Language badges
 * - Theme-aware styling
 * - Accessibility support
 * 
 * @param props - CodeBlock component props
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <CodeBlock 
 *   language="python" 
 *   filename="example.py"
 * >
   def hello():
       print("Hello, World!")
 * </CodeBlock>
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'text', 
  filename,
  className = '' 
}) => {
  const { getThemeClasses } = useThemeClasses();
  const [copied, setCopied] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  /**
   * Handles copying code to clipboard
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setDownloadError(null);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
      setDownloadError('Failed to copy code to clipboard');
    }
  }, [children]);

  /**
   * Handles downloading code as a file
   */
  const handleDownload = useCallback(() => {
    try {
      // Determine file extension based on language
      const extension = language === 'text' ? 'txt' : language;
      
      // Create blob with appropriate MIME type
      const mimeType = getMimeType(language);
      const blob = new Blob([children], { type: mimeType });
      
      // Create download URL
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `code.${extension}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      setDownloadError(null);
    } catch (error) {
      console.error('Failed to download code:', error);
      setDownloadError('Failed to download code file');
    }
  }, [children, language, filename]);

  /**
   * Gets MIME type for the given language
   */
  const getMimeType = useCallback((lang: string): string => {
    const mimeTypes: Record<string, string> = {
      javascript: 'text/javascript',
      typescript: 'text/typescript',
      python: 'text/x-python',
      java: 'text/x-java',
      cpp: 'text/x-c++',
      c: 'text/x-c',
      html: 'text/html',
      css: 'text/css',
      json: 'application/json',
      xml: 'application/xml',
      yaml: 'text/yaml',
      markdown: 'text/markdown',
    };
    
    return mimeTypes[lang] || 'text/plain';
  }, []);

  /**
   * Gets language display name
   */
  const getLanguageDisplayName = useCallback((lang: string): string => {
    const displayNames: Record<string, string> = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      html: 'HTML',
      css: 'CSS',
      json: 'JSON',
      xml: 'XML',
      yaml: 'YAML',
      markdown: 'Markdown',
    };
    
    return displayNames[lang] || lang.toUpperCase();
  }, []);

  return (
    <motion.div 
      className={`my-6 w-full rounded-lg overflow-hidden ${
        getThemeClasses(
          'bg-slate-50 border border-slate-200',
          'bg-slate-800 border border-slate-700'
        )
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      {(filename || language !== 'text') && (
        <div className={`
          flex items-center justify-between px-4 py-2
          ${getThemeClasses(
            'bg-slate-100 border-b border-slate-200',
            'bg-slate-700 border-b border-slate-600'
          )}
        `}>
          <div className="flex items-center gap-2">
            {/* Filename */}
            {filename && (
              <span className={`
                text-sm font-mono
                ${getThemeClasses('text-slate-600', 'text-slate-300')}
              `}>
                {filename}
              </span>
            )}
            
            {/* Language Badge */}
            {language !== 'text' && (
              <span className={`
                px-2 py-1 text-xs font-medium rounded
                ${getThemeClasses(
                  'bg-slate-200 text-slate-700',
                  'bg-slate-600 text-slate-200'
                )}
              `}>
                {getLanguageDisplayName(language)}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              className={`
                p-1.5 rounded hover:bg-white/20 transition-colors
                ${getThemeClasses('text-slate-600', 'text-slate-300')}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Download code"
              aria-label="Download code as file"
            >
              <Download size={16} />
            </motion.button>
            
            {/* Copy Button */}
            <motion.button
              onClick={handleCopy}
              className={`
                p-1.5 rounded hover:bg-white/20 transition-colors
                ${getThemeClasses('text-slate-600', 'text-slate-300')}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </motion.button>
          </div>
        </div>
      )}

      {/* Code Content */}
      <pre className={`p-4 w-full overflow-x-auto ${
        getThemeClasses('text-slate-800', 'text-slate-200')
      }`}>
        <code 
          className={`
            font-mono text-sm leading-relaxed block whitespace-pre
            ${language !== 'text' ? `language-${language}` : ''}
          `}
        >
          {children}
        </code>
      </pre>

      {/* Error Messages */}
      {downloadError && (
        <div className={`
          px-4 py-2 text-xs
          ${getThemeClasses(
            'bg-red-50 text-red-600 border-t border-red-200',
            'bg-red-900/20 text-red-400 border-t border-red-800'
          )}
        `}>
          {downloadError}
        </div>
      )}

      {/* Success Message */}
      {copied && (
        <motion.div 
          className={`
            px-4 py-2 text-xs
            ${getThemeClasses(
              'bg-green-50 text-green-600 border-t border-green-200',
              'bg-green-900/20 text-green-400 border-t border-green-800'
            )}
          `}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          Code copied to clipboard!
        </motion.div>
      )}
    </motion.div>
  );
};

export default CodeBlock;
