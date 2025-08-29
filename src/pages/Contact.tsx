import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, Mail, Linkedin, Github } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Contact() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
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
              Contact
            </h1>
          </motion.div>

          {/* Title separator line */}
          <motion.div
            className={`w-full h-px mb-8 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />

          {/* Main content layout */}
          <motion.div
            className="flex flex-col items-start gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Text content */}
            <motion.div
              className="w-full max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={`text-xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} leading-relaxed`}>
                Please feel free to contact me through LinkedIn, GitHub, or email!
              </div>
            </motion.div>

            {/* Horizontal line divider */}
            <motion.div
              className={`w-full max-w-2xl h-px ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            {/* Contact buttons */}
            <motion.div
              className="w-full max-w-md space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/ktwong665/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-2 rounded ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'}`}>
                  <Linkedin size={20} className="text-blue-600" />
                </div>
                <div className={`font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  LinkedIn
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/wongywrongy"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-2 rounded ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-700/20'}`}>
                  <Github size={20} className={theme === 'light' ? 'text-slate-800' : 'text-slate-100'} />
                </div>
                <div className={`font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  GitHub
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:kyle.t.wong@sjsu.edu"
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-2 rounded ${theme === 'light' ? 'bg-green-50' : 'bg-green-900/20'}`}>
                  <Mail size={20} className="text-green-600" />
                </div>
                <div className={`font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  kyle.t.wong@sjsu.edu
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
