import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { aboutContent } from '../content/about'

export default function About() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page title with back button */}
          <motion.div
            className="flex items-center gap-4 mb-8"
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
              {aboutContent.title}
            </h1>
          </motion.div>

          {/* Content */}
          <motion.div
            className={`prose prose-lg max-w-none ${
              theme === 'light' 
                ? 'prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-ul:text-slate-600 prose-li:text-slate-600' 
                : 'prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-slate-100 prose-ul:text-slate-300 prose-li:text-slate-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {aboutContent.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              >
                <h2 className={`text-2xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'} mb-4 ${index > 0 ? 'mt-8' : ''}`}>
                  {section.title}
                </h2>
                <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} leading-relaxed mb-6`}>
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
