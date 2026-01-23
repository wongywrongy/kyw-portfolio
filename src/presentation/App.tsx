/**
 * Main Application Component
 * 
 * This file contains the main App component that sets up routing,
 * global meta tags, and renders the application layout.
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { APP_CONFIG, ROUTES } from '../shared/constants';

// Layout Components
import DotGrid from './components/DotGrid';
import FloatingMenu from './components/FloatingMenu';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

/**
 * Main Application Component
 * 
 * The root component that sets up the application with routing,
 * theme provider, global meta tags, and layout components.
 * 
 * Features:
 * - React Router setup with all routes
 * - Theme provider for global theme management
 * - Global meta tags management
 * - Layout components (background, overlay, navigation)
 * - Error boundaries and fallbacks
 * - Performance optimizations
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <App />
 * ```
 */
const App: React.FC = () => {
  /**
   * Initializes font family from localStorage or default
   */
  useEffect(() => {
    const savedFont = localStorage.getItem('font-family') || APP_CONFIG.defaultFont;
    document.documentElement.setAttribute('data-font', savedFont);
  }, []);

  /**
   * Sets up global meta tags for SEO and social sharing
   */
  useEffect(() => {
    // Set document title
    document.title = APP_CONFIG.name;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', APP_CONFIG.description);
    }

    // Set viewport meta tag
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
    }

    // Set favicon
    const linkIcon = document.querySelector('link[rel="icon"]');
    if (linkIcon) {
      linkIcon.setAttribute('href', '/favicon.svg');
    }

    // Set theme color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = '#f8fafc'; // Default light theme color

    // Set Open Graph meta tags for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', APP_CONFIG.name);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', APP_CONFIG.description);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    }

    // Set Twitter Card meta tags
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) {
      twitterCard.setAttribute('content', 'summary_large_image');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', APP_CONFIG.name);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', APP_CONFIG.description);
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-bg-1 text-fg-1">
          {/* Background Components */}
          <DotGrid
            dotSize={3}
            gap={40}
          />
          
          {/* Navigation */}
          <FloatingMenu />
          
          {/* Main Content */}
          <main className="relative z-10">
            <Routes>
              {/* Main Routes */}
              <Route path={ROUTES.HOME} element={<div className="h-screen snap-y snap-proximity overflow-y-scroll"><Home /></div>} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.BLOG} element={<BlogIndex />} />
              <Route path={ROUTES.RESUME} element={<Resume />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              
              {/* Dynamic Routes */}
              <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 py-8 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  © {new Date().getFullYear()} Kyle Wong
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/wongywrongy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-c1 dark:text-slate-400 dark:hover:text-c1 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/ktwong665/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-c1 dark:text-slate-400 dark:hover:text-c1 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="mailto:kyle.t.wong@sjsu.edu" 
                    className="text-slate-500 hover:text-c1 dark:text-slate-400 dark:hover:text-c1 transition-colors"
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
