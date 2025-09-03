import React, { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import BlogImage from './BlogImage'
import CodeBlock from './CodeBlock'
import LaTeX from './LaTeX'

interface ContentItem {
  type: 'text' | 'heading' | 'latex' | 'code' | 'list' | 'image'
  content?: string
  level?: number
  display?: boolean
  language?: string
  filename?: string
  items?: string[]
  src?: string
  alt?: string
  caption?: string
  width?: number
  height?: number
}

interface ContentRendererProps {
  content: ContentItem[]
  className?: string
}

// Memoized content item renderer for better performance
const ContentItemRenderer = React.memo(({ item, index, theme }: { item: ContentItem; index: number; theme: string }) => {
  const animationDelay = Math.min(index * 0.05, 0.5) // Cap delay at 500ms for better UX

  const renderContentItem = useCallback(() => {
    switch (item.type) {
      case 'text':
        return (
          <motion.p
            className={`mb-4 leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
          >
            {item.content}
          </motion.p>
        )

      case 'heading':
        const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements
        const headingClasses = {
          1: 'mt-8 mb-4 first:mt-0 text-4xl font-bold',
          2: 'mt-6 mb-3 first:mt-0 text-3xl font-bold',
          3: 'mt-4 mb-2 first:mt-0 text-2xl font-semibold',
          4: 'mt-4 mb-2 first:mt-0 text-xl font-semibold'
        }
        
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
          >
            <HeadingTag
              className={`${headingClasses[item.level || 2]} ${
                theme === 'light' ? 'text-slate-800' : 'text-slate-100'
              }`}
            >
              {item.content}
            </HeadingTag>
          </motion.div>
        )

      case 'latex':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
          >
            <LaTeX display={item.display}>{item.content || ''}</LaTeX>
          </motion.div>
        )

      case 'code':
        return (
          <motion.div
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
        )

      case 'list':
        return (
          <motion.ul
            className="mb-4 pl-6 space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: animationDelay, ease: "easeOut" }}
          >
            {item.items?.map((listItem, listIndex) => (
              <li
                key={listIndex}
                className={`leading-relaxed ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}
                dangerouslySetInnerHTML={{ __html: listItem }}
              />
            ))}
          </motion.ul>
        )

      case 'image':
        return (
          <motion.div
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
            />
          </motion.div>
        )

      default:
        return null
    }
  }, [item, theme, animationDelay])

  return renderContentItem()
})

ContentItemRenderer.displayName = 'ContentItemRenderer'

export default function ContentRenderer({ content, className = '' }: ContentRendererProps) {
  const { theme } = useTheme()

  // Memoize the content array to prevent unnecessary re-renders
  const memoizedContent = useMemo(() => content, [content])

  return (
    <div className={className}>
      {memoizedContent.map((item, index) => (
        <ContentItemRenderer
          key={`${item.type}-${index}-${item.content?.slice(0, 20)}`}
          item={item}
          index={index}
          theme={theme}
        />
      ))}
    </div>
  )
}
