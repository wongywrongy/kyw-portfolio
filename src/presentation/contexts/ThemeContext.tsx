/**
 * Theme Context
 * 
 * This file contains the React Context for theme management.
 * It provides theme state and operations to child components
 * through the Context API.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { ThemeVariant, ThemeContextType } from '../../shared/types';
import { THEME_CONFIG } from '../../shared/constants';

/**
 * Theme Context Instance
 * 
 * Creates the React Context for theme management.
 * This context provides theme state and operations to components
 * throughout the application.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Props
 * 
 * Defines the props interface for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** Child components to wrap with theme context */
  children: ReactNode;
  /** Initial theme (optional, defaults to saved theme or system preference) */
  initialTheme?: ThemeVariant;
}

/**
 * Theme Provider Component
 * 
 * Provides theme context to child components. Manages theme state
 * and persistence through localStorage. Automatically detects and
 * applies system theme preferences.
 * 
 * @param props - ThemeProvider props
 * @returns JSX element with theme context
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MainContent />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme 
}) => {
  // State for current theme
  const [theme, setThemeState] = useState<ThemeVariant>(() => {
    // Initialize theme from props, localStorage, or system preference
    if (initialTheme) {
      return initialTheme;
    }
    
    // Try to get saved theme from localStorage
    try {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    
    // Fall back to system preference
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }
    } catch (error) {
      console.warn('Failed to detect system theme preference:', error);
    }
    
    // Default fallback
    return THEME_CONFIG.defaultTheme;
  });

  /**
   * Saves theme to localStorage
   * 
   * @param themeToSave - Theme to save
   */
  const saveTheme = useCallback((themeToSave: ThemeVariant): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_CONFIG.storageKey, themeToSave);
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, []);

  /**
   * Applies theme to the document
   * 
   * @param themeToApply - Theme to apply
   */
  const applyTheme = useCallback((themeToApply: ThemeVariant): void => {
    try {
      if (typeof document === 'undefined') {
        return;
      }

      // Remove existing theme classes
      document.documentElement.classList.remove('light', 'dark');
      
      // Add new theme class
      document.documentElement.classList.add(themeToApply);
      
      // Set data attribute for CSS variable access
      document.documentElement.setAttribute('data-theme', themeToApply);
      
      // Update meta theme-color for mobile browsers
      updateMetaThemeColor(themeToApply);
    } catch (error) {
      console.warn('Failed to apply theme to document:', error);
    }
  }, []);

  /**
   * Updates the meta theme-color for mobile browsers
   * 
   * @param themeToApply - Theme being applied
   */
  const updateMetaThemeColor = useCallback((themeToApply: ThemeVariant): void => {
    try {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
      
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }

      // Set theme color based on current theme
      const themeColor = themeToApply === 'light' ? '#f8fafc' : '#0f172a';
      metaThemeColor.content = themeColor;
    } catch (error) {
      console.warn('Failed to update meta theme color:', error);
    }
  }, []);

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = useCallback((): void => {
    const newTheme: ThemeVariant = theme === 'light' ? 'dark' : 'light';
    
    setThemeState(newTheme);
    saveTheme(newTheme);
    applyTheme(newTheme);
  }, [theme, saveTheme, applyTheme]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if no theme is saved (user hasn't made a preference)
      try {
        const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey);
        if (!savedTheme) {
          const systemTheme: ThemeVariant = e.matches ? 'dark' : 'light';
          setThemeState(systemTheme);
          applyTheme(systemTheme);
        }
      } catch (error) {
        console.warn('Failed to handle system theme change:', error);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [applyTheme]);

  // Save theme when it changes
  useEffect(() => {
    saveTheme(theme);
  }, [theme, saveTheme]);

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * 
 * Provides access to theme context with proper error handling.
 * This hook should be used instead of useContext(ThemeContext)
 * directly to ensure proper error handling.
 * 
 * @returns Theme context value
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme } = useThemeContext();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
};

/**
 * Higher-order component for theme-aware components
 * 
 * Wraps a component with theme context, providing theme props
 * without requiring the component to use hooks.
 * 
 * @param Component - Component to wrap
 * @returns Wrapped component with theme props
 * 
 * @example
 * ```tsx
 * const ThemedButton = withTheme(({ theme, toggleTheme, ...props }) => (
 *   <button 
 *     onClick={toggleTheme}
 *     className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
 *     {...props}
 *   />
 * ));
 * ```
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P & ThemeContextType>
): React.ComponentType<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    const themeContext = useThemeContext();
    return <Component {...props} {...themeContext} />;
  };

  WrappedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Theme context consumer component
 * 
 * Alternative to useThemeContext hook for class components
 * or when you prefer render props pattern.
 * 
 * @param children - Render prop function
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <ThemeConsumer>
 *   {({ theme, toggleTheme }) => (
 *     <button onClick={toggleTheme}>
 *       Theme: {theme}
 *     </button>
 *   )}
 * </ThemeConsumer>
 * ```
 */
export const ThemeConsumer: React.FC<{
  children: (context: ThemeContextType) => ReactNode;
}> = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('ThemeConsumer must be used within a ThemeProvider');
        }
        return children(context);
      }}
    </ThemeContext.Consumer>
  );
};
