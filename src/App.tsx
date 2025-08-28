import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import GrainOverlay from './components/GrainOverlay'
import PrismBackground from './components/PrismBackground'
import FloatingMenu from './components/FloatingMenu'
import Home from './pages/Home'
import About from './pages/About'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import Menu from './pages/Menu'

function App() {
  return (
    <Router basename="/portfolio">
      <Helmet>
        <title>Kyle Wong — Portfolio</title>
        <meta name="description" content="CS @ SJSU · Applied AI @ SKKU · R&D @ Spartan Racing · Debian Apprentice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>
      
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
            <Route path="/blog/:slug" element={<BlogPost />} />
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
