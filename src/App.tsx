import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import GrainOverlay from './components/layout/GrainOverlay'
import PrismBackground from './components/layout/PrismBackground'
import FloatingMenu from './components/layout/FloatingMenu'
import Home from './pages/Home'
import About from './pages/About'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import Menu from './pages/Menu'

function App() {
  // Set document meta tags
  useEffect(() => {
    document.title = 'Kyle Wong — Portfolio'
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'CS @ SJSU · Applied AI @ SKKU · R&D @ Spartan Racing · Debian Apprentice')
    
    // Set viewport
    let viewport = document.querySelector('meta[name="viewport"]')
    if (!viewport) {
      viewport = document.createElement('meta')
      viewport.setAttribute('name', 'viewport')
      document.head.appendChild(viewport)
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1')
    
    // Set favicon
    let favicon = document.querySelector('link[rel="icon"]')
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.setAttribute('rel', 'icon')
      favicon.setAttribute('type', 'image/svg+xml')
      document.head.appendChild(favicon)
    }
    favicon.setAttribute('href', '/favicon.svg')
  }, [])

  return (
    <Router basename="/kyw-portfolio">
      <div className="min-h-screen bg-bg-1 text-fg-1">
        {/* Background Animation */}
        <div className="bg-animated fixed inset-0 -z-10" />
        
        {/* Prism Background */}
        <PrismBackground />
        
        {/* Grain Overlay */}
        <GrainOverlay />
        
        {/* Floating Menu */}
        <FloatingMenu />
        
        {/* Main Content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-sm text-fg-1/60">
          <div className="max-w-[900px] mx-auto px-6">
            <p>&copy; 2025 Kyle Wong. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <a 
                href="https://github.com/wongywrongy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-c3 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ktwong665/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-c3 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:kyle.t.wong@sjsu.edu"
                className="hover:text-c3 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
