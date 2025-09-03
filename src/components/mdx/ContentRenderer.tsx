import React from 'react'
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

export default function ContentRenderer({ content, className = '' }: ContentRendererProps) {
  const { theme } = useTheme()

  const renderContentItem = (item: ContentItem, index: number) => {
    const animationDelay = index * 0.1

    switch (item.type) {
      case 'text':
        return (
          <motion.p
            key={index}
            className={`mb-4 leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: animationDelay }}
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
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: animationDelay }}
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
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: animationDelay }}
          >
            <LaTeX display={item.display}>{item.content || ''}</LaTeX>
          </motion.div>
        )

      case 'code':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: animationDelay }}
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
            key={index}
            className="mb-4 pl-6 space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: animationDelay }}
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
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: animationDelay }}
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
  }

  return (
    <div className={className}>
      {content.map((item, index) => renderContentItem(item, index))}
    </div>
  )
}
