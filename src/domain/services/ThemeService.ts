/**
 * Theme Service
 * 
 * This file contains the ThemeService domain service that handles
 * business logic related to theme management and preferences.
 */

import type { ThemeVariant } from '../../shared/types';
import { THEME_CONFIG } from '../../shared/constants';

/**
 * Theme Service Interface
 * 
 * Defines the contract for theme-related business operations.
 */
export interface IThemeService {
  /**
   * Gets the current theme
   * @returns Current theme variant
   */
  getCurrentTheme(): ThemeVariant;

  /**
   * Sets the theme
   * @param theme - Theme variant to set
   */
  setTheme(theme: ThemeVariant): void;

  /**
   * Toggles between light and dark themes
   */
  toggleTheme(): void;

  /**
   * Gets the saved theme from storage
   * @returns Saved theme or default theme
   */
  getSavedTheme(): ThemeVariant;

  /**
   * Saves the theme to storage
   * @param theme - Theme to save
   */
  saveTheme(theme: ThemeVariant): void;

  /**
   * Applies theme to the document
   * @param theme - Theme to apply
   */
  applyTheme(theme: ThemeVariant): void;

  /**
   * Gets the system preference theme
   * @returns System preferred theme
   */
  getSystemTheme(): ThemeVariant;

  /**
   * Checks if a theme is valid
   * @param theme - Theme to validate
   * @returns True if theme is valid
   */
  isValidTheme(theme: string): theme is ThemeVariant;
}

/**
 * Theme Service Implementation
 * 
 * Implements business logic for theme operations including
 * persistence, system preference detection, and DOM manipulation.
 */
export class ThemeService implements IThemeService {
  private currentTheme: ThemeVariant;

  /**
   * Creates a new ThemeService instance
   * 
   * @param initialTheme - Initial theme to use
   */
  constructor(initialTheme: ThemeVariant = THEME_CONFIG.defaultTheme) {
    this.currentTheme = initialTheme;
    this.initializeTheme();
  }

  /**
   * Initializes the theme service
   * Loads saved theme or uses system preference
   */
  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    const systemTheme = this.getSystemTheme();
    
    // Use saved theme if available, otherwise use system theme
    const themeToUse = savedTheme || systemTheme;
    
    this.currentTheme = themeToUse;
    this.applyTheme(this.currentTheme);
  }

  /**
   * Gets the current theme
   * 
   * @returns Current theme variant
   */
  public getCurrentTheme(): ThemeVariant {
    return this.currentTheme;
  }

  /**
   * Sets the theme
   * 
   * @param theme - Theme variant to set
   */
  public setTheme(theme: ThemeVariant): void {
    if (!this.isValidTheme(theme)) {
      throw new Error(`Invalid theme: ${theme}`);
    }

    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  /**
   * Toggles between light and dark themes
   */
  public toggleTheme(): void {
    const newTheme: ThemeVariant = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Gets the saved theme from localStorage
   * 
   * @returns Saved theme or default theme if none saved
   */
  public getSavedTheme(): ThemeVariant {
    try {
      if (typeof window === 'undefined') {
        return THEME_CONFIG.defaultTheme;
      }

      const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey);
      
      if (!savedTheme) {
        return THEME_CONFIG.defaultTheme;
      }

      return this.isValidTheme(savedTheme) ? savedTheme : THEME_CONFIG.defaultTheme;
    } catch (error) {
      console.warn('Failed to get saved theme:', error);
      return THEME_CONFIG.defaultTheme;
    }
  }

  /**
   * Saves the theme to localStorage
   * 
   * @param theme - Theme to save
   */
  public saveTheme(theme: ThemeVariant): void {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      localStorage.setItem(THEME_CONFIG.storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }

  /**
   * Applies theme to the document
   * 
   * @param theme - Theme to apply
   */
  public applyTheme(theme: ThemeVariant): void {
    try {
      if (typeof document === 'undefined') {
        return;
      }

      // Remove existing theme classes
      document.documentElement.classList.remove('light', 'dark');
      
      // Add new theme class
      document.documentElement.classList.add(theme);
      
      // Set data attribute for CSS variable access
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor(theme);
    } catch (error) {
      console.warn('Failed to apply theme:', error);
    }
  }

  /**
   * Gets the system preference theme
   * 
   * @returns System preferred theme
   */
  public getSystemTheme(): ThemeVariant {
    try {
      if (typeof window === 'undefined' || !window.matchMedia) {
        return THEME_CONFIG.defaultTheme;
      }

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch (error) {
      console.warn('Failed to get system theme:', error);
      return THEME_CONFIG.defaultTheme;
    }
  }

  /**
   * Checks if a theme is valid
   * 
   * @param theme - Theme to validate
   * @returns True if theme is valid
   */
  public isValidTheme(theme: string): theme is ThemeVariant {
    return theme === 'light' || theme === 'dark';
  }

  /**
   * Updates the meta theme-color for mobile browsers
   * 
   * @param theme - Current theme
   */
  private updateMetaThemeColor(theme: ThemeVariant): void {
    try {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
      
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }

      // Set theme color based on current theme
      const themeColor = theme === 'light' ? '#f8fafc' : '#0f172a';
      metaThemeColor.content = themeColor;
    } catch (error) {
      console.warn('Failed to update meta theme color:', error);
    }
  }

  /**
   * Listens for system theme changes
   * 
   * @param callback - Callback function to execute when system theme changes
   * @returns Function to remove the listener
   */
  public onSystemThemeChange(callback: (theme: ThemeVariant) => void): () => void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return () => {};
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: ThemeVariant = e.matches ? 'dark' : 'light';
      callback(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }

  /**
   * Gets the opposite theme
   * 
   * @param theme - Current theme
   * @returns Opposite theme
   */
  public getOppositeTheme(theme: ThemeVariant): ThemeVariant {
    return theme === 'light' ? 'dark' : 'light';
  }

  /**
   * Checks if the current theme is dark
   * 
   * @returns True if current theme is dark
   */
  public isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Checks if the current theme is light
   * 
   * @returns True if current theme is light
   */
  public isLightTheme(): boolean {
    return this.currentTheme === 'light';
  }
}
