import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { aboutContent } from '../content/about'
import { useEffect, useState, useRef } from 'react'

export default function About() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastChangeTime = useRef(Date.now())

  // Calculate fixed scroll positions for timeline
  const timelinePositions = aboutContent.sections.map((_, index) => {
    return index * 110 // Fixed 110px intervals
  })

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now()
      const scrollY = window.scrollY
      setScrollY(scrollY)
      
      // Find which timeline position we're closest to
      let newActiveSection = 0
      let minDistance = Infinity
      
      timelinePositions.forEach((position, index) => {
        const distance = Math.abs(scrollY - position)
        if (distance < minDistance) {
          minDistance = distance
          newActiveSection = index
        }
      })
      
      // 10% less aggressive timing: 11ms -> 12ms
      if (currentTime - lastChangeTime.current > 12) {
        setActiveSection(newActiveSection)
        lastChangeTime.current = currentTime
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setActiveSection(index)
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (index: number) => {
    const targetPosition = timelinePositions[index]
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
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
              {aboutContent.title}
            </h1>
          </motion.div>

          {/* Title separator line */}
          <motion.div
            className={`w-full h-px mb-8 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />

          {/* Main Content with Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Text Content */}
            <div className="lg:col-span-3">
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
                    ref={(el) => {
                      sectionRefs.current[index] = el
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    className={index === aboutContent.sections.length - 1 ? "mb-0" : "mb-8"}
                  >
                    <h2 className={`text-2xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'} mb-4 ${index > 0 ? 'mt-8' : ''}`}>
                      {section.title}
                    </h2>
                    <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} leading-relaxed`}>
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Timeline Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <motion.div
                  className="relative"
                  style={{
                    transform: `translateY(${scrollY * 0.3}px)`
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                                                        {/* Timeline Container */}
                   <div className="p-6 rounded-lg">
                    
                                         {/* Timeline Items */}
                     <div className="relative">
                       {/* Vertical line */}
                       <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`} />
                       
                       {aboutContent.sections.map((section, index) => (
                         <motion.div
                           key={section.title}
                           className="relative mb-24 cursor-pointer group"
                          onClick={() => scrollToSection(index)}
                          whileHover={{ x: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Timeline dot */}
                          <div className={`absolute left-3 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            activeSection === index
                              ? `${theme === 'light' ? 'bg-blue-500 border-blue-500' : 'bg-blue-400 border-blue-400'} shadow-lg scale-125`
                              : `${theme === 'light' ? 'bg-white border-slate-400' : 'bg-slate-800 border-slate-500'} group-hover:border-blue-400 group-hover:scale-110`
                          }`} />
                          
                          {/* Content */}
                          <div className="ml-8">
                            <h4 className={`text-sm font-medium transition-colors duration-300 ${
                              activeSection === index
                                ? `${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`
                                : `${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} group-hover:text-blue-500`
                            }`}>
                              {section.title}
                            </h4>
                            <div className={`text-xs mt-1 transition-colors duration-300 ${
                              activeSection === index
                                ? `${theme === 'light' ? 'text-blue-500' : 'text-blue-300'}`
                                : `${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`
                            }`}>
                              {index + 1} of {aboutContent.sections.length}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
