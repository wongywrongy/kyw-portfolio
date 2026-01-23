/**
 * Content Renderer Component
 * 
 * This file contains the ContentRenderer component for rendering
 * structured content items with proper styling and animations.
 */

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ContentRendererProps, ContentItem } from '../../shared/types';
import { useThemeClasses } from '../../shared/useTheme';
import BlogImage from './BlogImage';
import CodeBlock from './CodeBlock';
import LaTeX from './LaTeX';

/**
 * Content Item Renderer Props
 * 
 * Defines the props for individual content item rendering
 */
interface ContentItemRendererProps {
  /** Content item to render */
  item: ContentItem;
  /** Index of the item in the content array */
  index: number;
  /** Current theme */
  theme: string;
}

/**
 * Content Item Renderer Component
 * 
 * Renders individual content items with appropriate styling and animations.
 * This component is memoized for performance optimization.
 * 
 * @param props - ContentItemRenderer props
 * @returns JSX element
 */
const ContentItemRenderer: React.FC<ContentItemRendererProps> = React.memo(({ 
  item, 
  index, 
  theme 
}) => {
  const { getThemeClasses } = useThemeClasses();
  
  // Calculate animation delay with a cap for better UX
  const animationDelay = Math.min(index * 0.05, 0.5);

  /**
   * Renders text content with proper styling
   */
  const renderText = useCallback(() => {
    return (
      <motion.p
        className={`mb-6 leading-relaxed text-base md:text-lg break-words overflow-wrap-anywhere ${
          getThemeClasses('text-slate-700', 'text-slate-300')
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
      >
        {item.content}
      </motion.p>
    );
  }, [item.content, animationDelay, getThemeClasses]);

  /**
   * Renders heading with appropriate level and styling
   */
  const renderHeading = useCallback(() => {
    const level = item.level || 2;
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    
    // Define heading styles based on level
    const headingStyles = {
      1: 'mt-12 mb-6 first:mt-0 text-4xl md:text-5xl font-bold',
      2: 'mt-10 mb-4 first:mt-0 text-3xl md:text-4xl font-bold',
      3: 'mt-8 mb-3 first:mt-0 text-2xl md:text-3xl font-semibold',
      4: 'mt-6 mb-2 first:mt-0 text-xl md:text-2xl font-semibold',
    };
    
    const baseStyles = headingStyles[level as keyof typeof headingStyles] || headingStyles[2];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
      >
        <HeadingTag
          className={`${baseStyles} ${
            getThemeClasses('text-slate-800', 'text-slate-100')
          }`}
          id={item.content?.toLowerCase().replace(/\s+/g, '-')}
        >
          {item.content}
        </HeadingTag>
      </motion.div>
    );
  }, [item.content, item.level, animationDelay, getThemeClasses]);

  /**
   * Renders LaTeX mathematical expressions
   */
  const renderLaTeX = useCallback(() => {
    return (
      <motion.div
        className={`${item.display ? 'my-8' : 'my-4'} w-full overflow-x-auto`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
      >
        <LaTeX display={item.display}>
          {item.content || ''}
        </LaTeX>
      </motion.div>
    );
  }, [item.content, item.display, animationDelay]);

  /**
   * Renders code blocks with syntax highlighting
   */
  const renderCode = useCallback(() => {
    return (
      <motion.div
        className="my-8 w-full overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
      >
        <CodeBlock
          language={item.language || 'text'}
          filename={item.filename}
        >
          {item.content || ''}
        </CodeBlock>
      </motion.div>
    );
  }, [item.content, item.language, item.filename, animationDelay]);

  /**
   * Renders lists with proper styling
   */
  const renderList = useCallback(() => {
    if (!item.items || item.items.length === 0) {
      return null;
    }

    return (
      <motion.ul
        className="mb-6 pl-6 space-y-2 list-disc break-words"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
      >
        {item.items.map((listItem, listIndex) => (
          <motion.li
            key={listIndex}
            className={`leading-relaxed text-base md:text-lg break-words overflow-wrap-anywhere ${
              getThemeClasses('text-slate-700', 'text-slate-300')
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: animationDelay + (listIndex * 0.05),
              ease: "easeOut" 
            }}
            dangerouslySetInnerHTML={{ __html: listItem }}
          />
        ))}
      </motion.ul>
    );
  }, [item.items, animationDelay, getThemeClasses]);

  /**
   * Renders images with optimization and accessibility
   */
  const renderImage = useCallback(() => {
    return (
      <motion.div
        className="my-8 w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
      >
        <BlogImage
          src={item.src || ''}
          alt={item.alt || ''}
          caption={item.caption}
          width={item.width}
          height={item.height}
          quality={item.quality}
          format={item.format}
        />
      </motion.div>
    );
  }, [
    item.src, 
    item.alt, 
    item.caption, 
    item.width, 
    item.height, 
    item.quality, 
    item.format, 
    animationDelay
  ]);

  /**
   * Main render function that dispatches to appropriate renderer
   */
  const renderContentItem = useCallback(() => {
    switch (item.type) {
      case 'text':
        return renderText();
      case 'heading':
        return renderHeading();
      case 'latex':
        return renderLaTeX();
      case 'code':
        return renderCode();
      case 'list':
        return renderList();
      case 'image':
        return renderImage();
      default:
        console.warn(`Unknown content item type: ${item.type}`);
        return null;
    }
  }, [
    item.type,
    renderText,
    renderHeading,
    renderLaTeX,
    renderCode,
    renderList,
    renderImage
  ]);

  return <>{renderContentItem()}</>;
});

// Set display name for debugging
ContentItemRenderer.displayName = 'ContentItemRenderer';

/**
 * Content Renderer Component
 * 
 * Main component for rendering structured content with proper styling,
 * animations, and performance optimizations.
 * 
 * Features:
 * - Renders various content types (text, headings, LaTeX, code, lists, images)
 * - Staggered animations for better visual experience
 * - Theme-aware styling
 * - Performance optimizations with memoization
 * - Accessibility support
 * 
 * @param props - ContentRenderer props
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <ContentRenderer 
 *   content={post.content || []}
 *   className="prose prose-lg max-w-none"
 * />
 * ```
 */
export const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  const { getThemeClasses } = useThemeClasses();

  /**
   * Memoized content array to prevent unnecessary re-renders
   */
  const memoizedContent = useMemo(() => content, [content]);

  /**
   * Validates content items and filters out invalid ones
   */
  const validatedContent = useMemo(() => {
    return memoizedContent.filter(item => {
      // Basic validation
      if (!item || !item.type) {
        console.warn('Invalid content item:', item);
        return false;
      }

      // Type-specific validation
      switch (item.type) {
        case 'text':
        case 'heading':
          return !!(item.content && item.content.trim().length > 0);
        case 'latex':
          return !!(item.content && item.content.trim().length > 0);
        case 'code':
          return !!(item.content && item.content.trim().length > 0);
        case 'list':
          return !!(item.items && item.items.length > 0);
        case 'image':
          return !!(item.src && item.alt);
        default:
          console.warn(`Unknown content item type: ${item.type}`);
          return false;
      }
    });
  }, [memoizedContent]);

  return (
    <div className={`${className} w-full max-w-full overflow-x-hidden`}>
      {validatedContent.map((item, index) => {
        const content = (
          <ContentItemRenderer
            key={`${item.type}-${index}-${item.content?.slice(0, 20)}`}
            item={item}
            index={index}
            theme="theme" // This will be determined by the hook
          />
        );
        
        // If fullWidth is true, wrap in a breakout container
        if (item.fullWidth) {
          return (
            <div 
              key={`${item.type}-${index}-${item.content?.slice(0, 20)}`} 
              className="w-screen relative left-1/2 -translate-x-1/2 px-6 overflow-x-auto"
            >
              {content}
            </div>
          );
        }
        
        return content;
      })}
      
      {/* Empty state */}
      {validatedContent.length === 0 && (
        <div className={`
          text-center py-8
          ${getThemeClasses('text-slate-500', 'text-slate-400')}
        `}>
          <p>No content to display</p>
        </div>
      )}
    </div>
  );
};

export default ContentRenderer;
