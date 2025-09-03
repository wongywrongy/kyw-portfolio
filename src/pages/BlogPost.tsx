import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Calendar, Clock, ArrowLeft } from 'lucide-react'
import { useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { allPosts } from '../content/blog'
import type { BlogImage } from '../content/blog'
import BlogImageComponent from '../components/mdx/BlogImage'
import MarkdownRenderer from '../components/mdx/MarkdownRenderer'

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const { theme } = useTheme()

  // Find the post by ID
  const post = useMemo(() => {
    const postId = parseInt(id || '0')
    return allPosts.find(p => p.id === postId)
  }, [id])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research':
        return 'bg-blue-600 text-white'
      case 'blog':
        return 'bg-slate-600 text-white'
      case 'projects':
        return 'bg-emerald-600 text-white'
      default:
        return 'bg-slate-500 text-white'
    }
  }

  if (!post) {
    return (
      <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'} mb-4`}>Post Not Found</h1>
          <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} mb-6`}>The post you're looking for doesn't exist.</p>
                      <Link
              to="/blog"
              className={`inline-flex items-center gap-2 px-4 py-2 ${theme === 'light' ? 'bg-slate-700 text-white' : 'bg-slate-700 text-slate-100'} rounded-lg hover:bg-slate-600 transition-all duration-200`}
            >
              <ArrowLeft size={16} />
              Back
            </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Post header with back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Back button and title */}
            <div className="flex items-center gap-4 mb-6">
                          <Link
              to="/blog"
              className="p-2 text-slate-400 hover:text-c3 transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </Link>
              <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                {post.title}
              </h1>
            </div>

            {/* Category badge and metadata */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(post.category)}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <div className={`flex items-center gap-4 text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>


          </motion.div>

          {/* Post content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <MarkdownRenderer 
              content={post.content || ''}
              className={`prose prose-lg max-w-none font-sans ${
                theme === 'light' 
                  ? 'prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-ul:text-slate-600 prose-li:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-500' 
                  : 'prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-slate-100 prose-ul:text-slate-300 prose-li:text-slate-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300'
              }`}
            />
          </motion.div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {post.images.map((image: BlogImage, index: number) => (
                <BlogImageComponent
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  width={image.width}
                  height={image.height}
                />
              ))}
            </motion.div>
          )}

          {/* Back to blog button */}
          <motion.div
            className={`mt-12 pt-8 border-t ${theme === 'light' ? 'border-slate-300' : 'border-slate-700'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 px-6 py-3 ${theme === 'light' ? 'bg-slate-700 text-white' : 'bg-slate-700 text-slate-100'} rounded-lg hover:bg-slate-600 transition-all duration-200`}
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
