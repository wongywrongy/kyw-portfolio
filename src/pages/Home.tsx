import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Main heading with gradient text */}
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-c1 via-c2 to-c3 bg-clip-text text-transparent py-8 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Kyle Wong
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-fg-1/80 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          CS @ SJSU · AI @ SKKU
        </motion.p>

        {/* Expandable button container */}
        <motion.div
          className="relative inline-block group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Main button */}
          <Link to="/menu">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-c1 to-c2 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Explore
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
