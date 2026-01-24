/**
 * Theme Hook
 * 
 * This file contains the useTheme hook that provides theme management
 * functionality to React components. It integrates with the ThemeService
 * and provides a clean interface for theme operations.
 */

import { useContext, useEffect, useState, useCallback } from 'react';
import type { ThemeVariant } from '../types';
import { ThemeService } from '../domain/services/ThemeService';
import { ThemeContext } from '../presentation/contexts/ThemeContext';

/**
 * Theme Hook Return Type
 * 
 * Defines the return type of the useTheme hook
 */
export interface UseThemeReturn {
  /** Current theme variant */
  theme: ThemeVariant;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Function to set a specific theme */
  setTheme: (theme: ThemeVariant) => void;
  /** Check if current theme is dark */
  isDark: boolean;
  /** Check if current theme is light */
  isLight: boolean;
  /** Get the opposite theme */
  getOppositeTheme: () => ThemeVariant;
}

/**
 * Custom hook for theme management
 * 
 * Provides theme state and operations to React components.
 * This hook integrates with the ThemeService and ThemeContext
 * to provide a consistent theme experience across the application.
 * 
 * @returns Theme state and operations
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme, isDark } = useTheme();
 *   
 *   return (
 *     <div className={isDark ? 'dark' : 'light'}>
 *       <button onClick={toggleTheme}>
 *         Switch to {isDark ? 'light' : 'dark'} theme
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, toggleTheme: contextToggleTheme } = context;
  
  // Local state for theme service instance
  const [themeService] = useState(() => new ThemeService(theme));

  /**
   * Enhanced toggle theme function
   * Uses the theme service for business logic
   */
  const toggleTheme = useCallback(() => {
    try {
      themeService.toggleTheme();
      contextToggleTheme();
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }, [themeService, contextToggleTheme]);

  /**
   * Set specific theme function
   * Uses the theme service for business logic
   */
  const setTheme = useCallback((newTheme: ThemeVariant) => {
    try {
      themeService.setTheme(newTheme);
      contextToggleTheme(); // This will trigger a re-render
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [themeService, contextToggleTheme]);

  /**
   * Check if current theme is dark
   */
  const isDark = theme === 'dark';

  /**
   * Check if current theme is light
   */
  const isLight = theme === 'light';

  /**
   * Get the opposite theme
   */
  const getOppositeTheme = useCallback((): ThemeVariant => {
    return themeService.getOppositeTheme(theme);
  }, [themeService, theme]);

  // Listen for system theme changes (disabled - default to light instead)
  // Removed system theme detection to always default to light mode

  // Sync theme service with context theme
  useEffect(() => {
    if (themeService.getCurrentTheme() !== theme) {
      themeService.setTheme(theme);
    }
  }, [theme, themeService]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark,
    isLight,
    getOppositeTheme,
  };
}

/**
 * Hook for getting theme-aware CSS classes
 * 
 * Provides utility functions for generating theme-aware CSS classes
 * based on the current theme.
 * 
 * @returns Object with utility functions for theme-aware styling
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, getThemeClasses } = useThemeClasses();
 *   
 *   return (
 *     <div className={getThemeClasses('bg-white dark:bg-slate-800')}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useThemeClasses() {
  const { theme, isDark, isLight } = useTheme();

  /**
   * Get theme-aware CSS classes
   * 
   * @param lightClass - CSS class for light theme
   * @param darkClass - CSS class for dark theme
   * @returns Appropriate CSS class for current theme
   */
  const getThemeClasses = useCallback((
    lightClass: string,
    darkClass?: string
  ): string => {
    if (isLight) {
      return lightClass;
    }
    return darkClass || lightClass;
  }, [isLight]);

  /**
   * Get conditional CSS classes based on theme
   * 
   * @param classes - Object with theme-specific classes
   * @returns CSS class string
   */
  const getConditionalClasses = useCallback((
    classes: { light?: string; dark?: string; default?: string }
  ): string => {
    if (isLight && classes.light) {
      return classes.light;
    }
    if (isDark && classes.dark) {
      return classes.dark;
    }
      return classes.default || '';
  }, [isLight, isDark]);

  /**
   * Get theme-aware color classes
   * 
   * @param lightColor - Color class for light theme
   * @param darkColor - Color class for dark theme
   * @returns Appropriate color class for current theme
   */
  const getThemeColor = useCallback((
    lightColor: string,
    darkColor: string
  ): string => {
    return isLight ? lightColor : darkColor;
  }, [isLight]);

  return {
    theme,
    isDark,
    isLight,
    getThemeClasses,
    getConditionalClasses,
    getThemeColor,
  };
}

/**
 * Hook for theme-aware animations
 * 
 * Provides theme-aware animation configurations for Framer Motion
 * and other animation libraries.
 * 
 * @returns Object with theme-aware animation configurations
 */
export function useThemeAnimations() {
  const { isDark, isLight } = useTheme();

  /**
   * Get theme-aware animation variants
   */
  const getThemeVariants = useCallback(() => ({
    fadeIn: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration: 0.3 }
      },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      },
      exit: { opacity: 0, y: -20 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" }
      },
      exit: { opacity: 0, scale: 0.95 }
    }
  }), []);

  /**
   * Get theme-aware transition configurations
   */
  const getThemeTransitions = useCallback(() => ({
    fast: { duration: 0.15 },
    normal: { duration: 0.3 },
    slow: { duration: 0.5 },
    spring: { type: "spring", stiffness: 300, damping: 30 },
    ease: { ease: "easeOut" }
  }), []);

  return {
    isDark,
    isLight,
    getThemeVariants,
    getThemeTransitions,
  };
}
