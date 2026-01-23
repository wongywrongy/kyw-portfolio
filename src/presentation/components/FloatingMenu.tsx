/**
 * Floating Menu Component
 * 
 * This file contains the FloatingMenu component that provides
 * top-centered navigation with expandable menu options.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../shared/useTheme';
import { ROUTES } from '../../shared/constants';

/**
 * Floating Menu Component
 * 
 * A sophisticated floating navigation menu that provides quick access
 * to key navigation options with smooth animations and theme integration.
 * 
 * Features:
 * - Expandable menu with smooth animations
 * - Theme toggle functionality
 * - Quick navigation to key pages
 * - Accessibility support
 * - Responsive design
 * - Performance optimizations
 * 
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <FloatingMenu />
 * ```
 */
export const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, isDark, isLight } = useTheme();
  const navigate = useNavigate();

  /**
   * Memoized theme aria label for accessibility
   */
  const themeAriaLabel = useMemo(() => 
    isLight ? 'Switch to dark mode' : 'Switch to light mode',
    [isLight]
  );

  /**
   * Handles menu toggle
   */
  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  /**
   * Handles navigation to a specific route
   */
  const handleNavigate = useCallback((route: string) => {
    navigate(route);
    setIsOpen(false); // Close menu after navigation
  }, [navigate]);


  /**
   * Handles theme toggle
   */
  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  /**
   * Gets theme-aware icon styles
   */
  const getIconStyles = useCallback((isActive: boolean = false) => {
    const baseStyles = 'p-2 transition-colors duration-200';
    const activeStyles = isActive 
      ? 'text-c3' 
      : isLight 
        ? 'text-slate-600 hover:text-c3' 
        : 'text-slate-400 hover:text-c3';
    
    return `${baseStyles} ${activeStyles}`;
  }, [isLight]);

  /**
   * Gets theme-aware text button styles
   */
  const getTextButtonStyles = useCallback(() => {
    const baseStyles = 'px-3 py-2.5 text-sm font-normal lowercase transition-colors duration-200';
    const textStyles = isLight 
      ? 'text-slate-600 hover:text-c3' 
      : 'text-slate-400 hover:text-c3';
    
    return `${baseStyles} ${textStyles}`;
  }, [isLight]);

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2">
        {/* Expandable Menu Items */}
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
                onClick={() => handleNavigate(ROUTES.HOME)}
                className={getTextButtonStyles()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Go to home"
              >
                home
              </motion.button>

              {/* Autobiography Button */}
              <motion.button
                onClick={() => handleNavigate(ROUTES.ABOUT)}
                className={getTextButtonStyles()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Go to about"
              >
                autobiography
              </motion.button>

              {/* Blog Button */}
              <motion.button
                onClick={() => handleNavigate(ROUTES.BLOG)}
                className={getTextButtonStyles()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Go to blog"
              >
                blog
              </motion.button>

              {/* Resume Button */}
              <motion.button
                onClick={() => handleNavigate(ROUTES.RESUME)}
                className={getTextButtonStyles()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Go to resume"
              >
                resume
              </motion.button>

              {/* Contact Button */}
              <motion.button
                onClick={() => handleNavigate(ROUTES.CONTACT)}
                className={getTextButtonStyles()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Go to contact"
              >
                contact
              </motion.button>

              {/* Theme Toggle Button */}
              <motion.button
                onClick={handleToggleTheme}
                className={`${getIconStyles()} w-11 h-11 sm:w-10 sm:h-10`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={themeAriaLabel}
                title={themeAriaLabel}
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isLight ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button (Carrot) */}
        <motion.button
          onClick={handleToggleMenu}
          className={`${getIconStyles(isOpen)} w-11 h-11 sm:w-12 sm:h-12`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          title={isOpen ? 'Close menu' : 'Open menu'}
          style={{ minWidth: '44px', minHeight: '44px' }}
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
  );
};

export default FloatingMenu;
