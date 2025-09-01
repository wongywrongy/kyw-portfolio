import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, Mail, Linkedin, Github, User } from 'lucide-react'
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
              className="p-2 text-slate-400 hover:text-c3 transition-colors duration-200 group"
            >
              <motion.div
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft size={24} />
              </motion.div>
            </Link>
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Contact
            </motion.h1>
          </motion.div>

          {/* Title separator line with gradient */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <motion.div
              className={`w-full h-px bg-gradient-to-r ${
                theme === 'light' ? 'from-blue-400 to-purple-400' : 'from-blue-500 to-purple-500'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* Main content layout */}
          <motion.div
            className="flex flex-col items-start gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Text content with enhanced styling */}
            <motion.div
              className="w-full max-w-2xl relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={`text-xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} leading-relaxed relative z-10`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Let's connect! I'm always excited to discuss new opportunities, collaborations, or just chat about technology.
                </motion.span>
              </div>
            </motion.div>

            {/* Horizontal line divider with animation */}
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className={`h-px ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`} />
              <motion.div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${
                  theme === 'light' ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-blue-500 via-purple-500 to-pink-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
            </motion.div>

            {/* Contact buttons with enhanced design */}
            <motion.div
              className="w-full max-w-md space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/ktwong665/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl' 
                    : 'bg-slate-800 border-slate-700 hover:border-blue-600 hover:shadow-xl'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <motion.div 
                  className={`p-3 rounded-lg ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'} relative z-10`}
                  whileHover={{ rotate: 5 }}
                >
                  <Linkedin size={20} className="text-blue-600" />
                </motion.div>
                <div className={`font-semibold relative z-10 ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  LinkedIn
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/wongywrongy"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xl' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:shadow-xl'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <motion.div 
                  className={`p-3 rounded-lg ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-700/20'} relative z-10`}
                  whileHover={{ rotate: 5 }}
                >
                  <Github size={20} className={theme === 'light' ? 'text-slate-800' : 'text-slate-100'} />
                </motion.div>
                <div className={`font-semibold relative z-10 ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  GitHub
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:kyle.t.wong@sjsu.edu"
                className={`group relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                  theme === 'light' 
                    ? 'bg-white border-slate-200 hover:border-green-300 hover:shadow-xl' 
                    : 'bg-slate-800 border-slate-700 hover:border-green-600 hover:shadow-xl'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <motion.div 
                  className={`p-3 rounded-lg ${theme === 'light' ? 'bg-green-50' : 'bg-green-900/20'} relative z-10`}
                  whileHover={{ rotate: 5 }}
                >
                  <Mail size={20} className="text-green-600" />
                </motion.div>
                <div className={`font-semibold relative z-10 ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  kyle.t.wong@sjsu.edu
                </div>
              </motion.a>
            </motion.div>

            {/* Additional decorative element aligned with content */}
            <motion.div
              className="w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${
                theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-900/20 border border-blue-800'
              }`}>
                <User size={16} className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>
                  Always open to new connections!
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
