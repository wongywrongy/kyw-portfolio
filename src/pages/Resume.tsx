import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Resume() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      {/* PDF Container */}
      <div className="flex items-center justify-center min-h-screen p-6 pt-20">
        <div className="w-full max-w-4xl">
          {/* Title with back button */}
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
              Resume
            </h1>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* PDF Display */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="aspect-[8.5/11] w-full">
                <iframe 
                  src="/portfolio/src/content/assets/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH"
                  className="w-full h-full border-0"
                  title="Resume PDF Viewer"
                  style={{
                    backgroundColor: 'white'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
