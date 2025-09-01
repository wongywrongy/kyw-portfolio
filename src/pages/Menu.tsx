import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { ChevronLeft } from 'lucide-react'

const menuItems = [
  {
    label: 'About me',
    path: '/about',
    description: 'Learn more about my background and interests'
  },
  {
    label: 'Resume',
    path: '/resume',
    description: 'View my professional experience and skills'
  },
  {
    label: 'My mind',
    path: '/blog',
    description: 'Explore my research, projects, blogs'
  },
  {
    label: 'Contact',
    path: '/contact',
    description: 'Get in touch with me'
  }
]

export default function Menu() {
  const { theme } = useTheme()

  // Memoize button styles with professional design
  const buttonStyles = useMemo(() => ({
    base: `group relative w-full p-6 backdrop-blur-md border transition-all duration-300 ease-out ${
      theme === 'light' 
        ? 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800/90 hover:border-slate-600/50' 
        : 'bg-white/80 border-slate-200/50 hover:bg-white/90 hover:border-slate-300/50'
    }`,
    // Professional button design: subtle rounded corners
    shape: "rounded-lg",
    // Professional shadow and hover effects
    shadow: "shadow-sm hover:shadow-lg",
    // Subtle border radius that's professional
    borderRadius: "rounded-[8px]",
    // Professional color scheme
    text: theme === 'light' ? "text-slate-100 font-medium" : "text-slate-800 font-medium",
    description: theme === 'light' ? "text-slate-300 text-sm" : "text-slate-600 text-sm",
    hover: "hover:scale-[1.02] hover:translate-y-[-2px]"
  }), [theme])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Back to home button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 p-2 ${theme === 'light' ? 'text-slate-600 hover:text-c3' : 'text-slate-400 hover:text-c3'} transition-colors duration-200`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`block ${buttonStyles.base} ${buttonStyles.shape} ${buttonStyles.shadow} ${buttonStyles.borderRadius} ${buttonStyles.hover}`}
              >
                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-xl font-semibold ${buttonStyles.text} mb-2 ${
                    theme === 'light' 
                      ? 'group-hover:text-slate-50' 
                      : 'group-hover:text-slate-900'
                  } transition-colors duration-200`}>
                    {item.label}
                  </h3>
                  <p className={`${buttonStyles.description} ${
                    theme === 'light' 
                      ? 'group-hover:text-slate-200' 
                      : 'group-hover:text-slate-700'
                  } transition-colors duration-200`}>
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
