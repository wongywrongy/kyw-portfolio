import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, BookOpen, FileText, Tag } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { blogContent, getPostsByCategory } from '../content/blog/index'

// Icon mapping for dynamic icon rendering
const iconMap = {
  FileText,
  BookOpen,
  Tag
}

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { theme } = useTheme()

  // Get filtered posts using the helper function
  const filteredPosts = useMemo(() => {
    return getPostsByCategory(selectedCategory)
  }, [selectedCategory])

  // Memoize category styles with theme-aware colors
  const categoryStyles = useMemo(() => ({
    active: theme === 'light' 
      ? "px-4 py-2 bg-slate-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
      : "px-4 py-2 bg-slate-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm",
    inactive: theme === 'light'
      ? "px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg text-slate-700 hover:bg-white/90 hover:border-slate-300/50 transition-all duration-200"
      : "px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
  }), [theme])

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

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page title with back button */}
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link
              to="/menu"
              className="p-2 text-slate-400 hover:text-c3 transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </Link>
            <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
              {blogContent.title}
            </h1>
          </motion.div>

          {/* Title separator line */}
          <motion.div
            className={`w-full h-px mb-8 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {blogContent.categories.map((category) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || FileText
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id 
                      ? categoryStyles.active 
                      : categoryStyles.inactive
                  }`}
                >
                  <Icon size={16} />
                  {category.label}
                </button>
              )
            })}
          </motion.div>

          {/* Posts grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className={`${theme === 'light' 
                  ? 'bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:bg-white/90 hover:border-slate-300/50' 
                  : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50'
                } rounded-xl p-6 transition-all duration-300 hover:scale-105 shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
              >
                {/* Category badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{post.readTime}</span>
                </div>

                {/* Post title */}
                <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'} mb-3 line-clamp-2`}>
                  {post.title}
                </h3>

                {/* Post excerpt */}
                <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} text-sm mb-4 line-clamp-3 leading-relaxed`}>
                  {post.excerpt}
                </p>



                {/* Date and read more */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{post.date}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className={`${theme === 'light' ? 'text-slate-500' : 'text-slate-400'} text-lg`}>No posts found in this category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
