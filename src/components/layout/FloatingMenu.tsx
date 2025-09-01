import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { ChevronUp, Sun, Moon, Home } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const themeAriaLabel = useMemo(() => 
    theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
    [theme]
  )

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 0, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut",
                delay: 0.1 // Delay to let carrot rotate first
              }}
            >
              {/* Home Button */}
              <motion.button
                onClick={() => navigate('/')}
                className={`p-2 ${theme === 'light' ? 'text-slate-600 hover:text-c3' : 'text-slate-400 hover:text-c3'} transition-colors duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Go to home page"
              >
                <Home className="w-5 h-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 ${theme === 'light' ? 'text-slate-600 hover:text-c3' : 'text-slate-400 hover:text-c3'} transition-colors duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={themeAriaLabel}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>

              {/* Menu Button */}
              <motion.button
                onClick={() => navigate('/menu')}
                className={`p-2 ${theme === 'light' ? 'text-slate-600 hover:text-c3' : 'text-slate-400 hover:text-c3'} transition-colors duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carrot Button - Just a carrot */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 ${theme === 'light' ? 'text-slate-600 hover:text-c3' : 'text-slate-400 hover:text-c3'} transition-colors duration-200`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}
