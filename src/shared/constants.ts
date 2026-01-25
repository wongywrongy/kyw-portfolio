/**
 * Application Constants
 * 
 * This file contains all the constant values used throughout the application.
 * Constants are organized by domain and follow naming conventions.
 */

import type { MenuItem } from './types';

// ============================================================================
// APPLICATION CONSTANTS
// ============================================================================

/**
 * Application metadata
 */
export const APP_CONFIG = {
  /** Application name */
  name: 'Kyle Wong Portfolio',
  /** Application version */
  version: '1.0.0',
  /** Application description */
  description: 'Computer Science @ SJSU',
  /** Default theme */
  defaultTheme: 'light' as const,
  /** Default font family */
  defaultFont: 'manrope' as const,
  /** Maximum content width */
  maxContentWidth: '1200px',
  /** Default animation duration */
  defaultAnimationDuration: 300,
} as const;

// ============================================================================
// ROUTING CONSTANTS
// ============================================================================

/**
 * Application routes
 */
export const ROUTES = {
  /** Home page route */
  HOME: '/',
  /** About page route */
  ABOUT: '/about',
  /** Blog index page route */
  BLOG: '/blog',
  /** Resume page route */
  RESUME: '/resume',
  /** Contact page route */
  CONTACT: '/contact',
  /** Dynamic blog post route */
  BLOG_POST: '/blog/:slug',
} as const;

// ============================================================================
// NAVIGATION CONSTANTS
// ============================================================================

/**
 * Menu items for the main navigation
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'About me',
    path: ROUTES.ABOUT,
    description: 'Learn more about my background and interests',
  },
  {
    label: 'Resume',
    path: ROUTES.RESUME,
    description: 'View my professional experience and skills',
  },
  {
    label: 'Blog',
    path: ROUTES.BLOG,
    description: 'Explore my research, projects, blogs',
  },
  {
    label: 'Contact',
    path: ROUTES.CONTACT,
    description: 'Get in touch with me',
  },
] as const;

// ============================================================================
// BLOG CONSTANTS
// ============================================================================

/**
 * Blog configuration
 */
export const BLOG_CONFIG = {
  /** Blog title */
  title: 'Blog',
  /** Number of posts per page */
  postsPerPage: 12,
  /** Maximum excerpt length */
  maxExcerptLength: 150,
} as const;

// ============================================================================
// THEME CONSTANTS
// ============================================================================

/**
 * Theme-related constants
 */
export const THEME_CONFIG = {
  /** Local storage key for theme preference */
  storageKey: 'theme',
  /** Animation duration for theme transitions */
  transitionDuration: 300,
  /** Grain opacity for light theme */
  lightGrainOpacity: 0.08,
  /** Grain opacity for dark theme */
  darkGrainOpacity: 0.14,
} as const;

/**
 * CSS custom properties for themes
 */
export const CSS_VARIABLES = {
  /** Background color variable */
  background: '--bg-1',
  /** Foreground (text) color variable */
  foreground: '--fg-1',
  /** Primary color variable */
  primary: '--c1',
  /** Secondary color variable */
  secondary: '--c2',
  /** Accent color variable */
  accent: '--c3',
  /** Grain opacity variable */
  grainOpacity: '--grain-opacity',
  /** Glass background variable */
  glassBackground: '--glass-bg',
  /** Glass border variable */
  glassBorder: '--glass-border',
  /** Card background variable */
  cardBackground: '--card-bg',
  /** Card border variable */
  cardBorder: '--card-border',
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

/**
 * Global font size scale factor
 * Adjust this value to scale all fonts globally (1.0 = 100%, 0.85 = 85%, etc.)
 * Change this single value to make all text larger or smaller across the entire site
 */
export const FONT_SCALE = 0.85; // 15% reduction (85% of original size)

/**
 * Typography configuration
 * Defines consistent font sizes and styles across the application
 * All sizes are scaled by FONT_SCALE for easy global adjustment
 */
export const TYPOGRAPHY = {
  /** Page titles (h1) - mobile optimized with large screen scaling */
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl',
  /** Section titles (h2) - mobile optimized with large screen scaling */
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl',
  /** Subsection titles (h3) - mobile optimized with large screen scaling */
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl',
  /** Body text large - mobile optimized with large screen scaling */
  bodyLarge: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl',
  /** Body text default - mobile optimized with large screen scaling */
  body: 'text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl',
  /** Body text small - mobile optimized with large screen scaling */
  bodySmall: 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl',
  /** Caption text */
  caption: 'text-xs sm:text-sm',
  /** Font weights */
  weights: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
} as const;

/**
 * Available font families for experimentation
 */
export const FONTS = {
  inter: 'inter',
  'space-grotesk': 'space-grotesk',
  'dm-sans': 'dm-sans',
  manrope: 'manrope',
  poppins: 'poppins',
} as const;

export type FontFamily = typeof FONTS[keyof typeof FONTS];

// ============================================================================
// COLOR SYSTEM
// ============================================================================

/**
 * Centralized color system for the entire application
 * All colors for both light and dark mode are defined here
 */
export const COLORS = {
  // Content box backgrounds
  contentBg: {
    light: 'bg-white/90',
    dark: 'dark:bg-slate-900/90',
  },
  // Content box borders
  contentBorder: {
    light: 'border-slate-200/50',
    dark: 'dark:border-slate-800/50',
  },
  // Text colors
  text: {
    light: 'text-slate-700',
    dark: 'dark:text-slate-200',
  },
  textSecondary: {
    light: 'text-slate-600',
    dark: 'dark:text-slate-400',
  },
  textMuted: {
    light: 'text-slate-500',
    dark: 'dark:text-slate-500',
  },
  // Heading colors
  heading: {
    light: 'text-slate-800',
    dark: 'dark:text-slate-100',
  },
  // Link/Accent colors
  link: {
    light: 'text-c1',
    dark: 'dark:text-c1',
  },
  linkHover: {
    light: 'hover:text-c2',
    dark: 'dark:hover:text-c2',
  },
  // Button backgrounds
  buttonBg: {
    light: 'bg-slate-100',
    dark: 'dark:bg-slate-800',
  },
  buttonHover: {
    light: 'hover:bg-slate-200',
    dark: 'dark:hover:bg-slate-700',
  },
  // Card backgrounds
  cardBg: {
    light: 'bg-white',
    dark: 'dark:bg-slate-800',
  },
  cardBorder: {
    light: 'border-slate-300',
    dark: 'dark:border-slate-600',
  },
  // Divider borders
  divider: {
    light: 'border-slate-200',
    dark: 'dark:border-slate-700',
  },
} as const;

/**
 * Helper function to get theme-aware color classes
 * @param lightClass - Class for light mode
 * @param darkClass - Class for dark mode
 * @returns Combined class string
 */
export const getColorClass = (lightClass: string, darkClass: string): string => {
  return `${lightClass} ${darkClass}`;
};

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================

/**
 * Standardized layout spacing for consistent design across all pages
 */
export const LAYOUT = {
  /** Standard container max width */
  containerMaxWidth: 'max-w-6xl',
  /** Standard page vertical padding - responsive */
  pagePaddingY: 'py-8 sm:py-12 md:py-20',
  /** Standard page horizontal padding - responsive */
  pagePaddingX: 'px-4 sm:px-6',
  /** Standard content box padding - responsive */
  contentPadding: 'p-4 sm:p-5 md:p-8',
  /** Standard header margin bottom - responsive */
  headerMarginBottom: 'mb-6 sm:mb-8 md:mb-12',
  /** Standard section spacing - responsive */
  sectionSpacing: 'mb-8 md:mb-12',
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

/**
 * Responsive breakpoints (matching Tailwind CSS)
 */
export const BREAKPOINTS = {
  /** Small screens (mobile) */
  sm: 640,
  /** Medium screens (tablet) */
  md: 768,
  /** Large screens (desktop) */
  lg: 1024,
  /** Extra large screens */
  xl: 1280,
  /** 2X large screens */
  '2xl': 1536,
} as const;

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

/**
 * Animation timing constants
 */
export const ANIMATION_CONFIG = {
  /** Fast animation duration */
  fast: 150,
  /** Normal animation duration */
  normal: 300,
  /** Slow animation duration */
  slow: 500,
  /** Default easing function */
  easing: 'ease-out',
  /** Stagger delay between items */
  staggerDelay: 50,
} as const;

/**
 * Framer Motion animation variants
 */
export const MOTION_VARIANTS = {
  /** Fade in animation */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  /** Slide up animation */
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  /** Scale in animation */
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
} as const;

// ============================================================================
// EXTERNAL LINKS
// ============================================================================

/**
 * External social media and professional links
 */
export const EXTERNAL_LINKS = {
  /** GitHub profile */
  github: 'https://github.com/wongywrongy',
  /** LinkedIn profile */
  linkedin: 'https://www.linkedin.com/in/ktwong665/',
  /** Email address */
  email: 'mailto:kyle.t.wong@sjsu.edu',
} as const;

// ============================================================================
// ASSET PATHS
// ============================================================================

/**
 * Static asset paths
 */
export const ASSETS = {
  /** Resume PDF path */
  resume: '/assets/Resume.pdf',
  /** Favicon path */
  favicon: '/favicon.svg',
  /** Default image placeholder */
  placeholder: '/assets/images/placeholder.jpg',
} as const;

// ============================================================================
// CONTENT LIMITS
// ============================================================================

/**
 * Content length and size limits
 */
export const CONTENT_LIMITS = {
  /** Maximum title length */
  maxTitleLength: 100,
  /** Maximum excerpt length */
  maxExcerptLength: 200,
  /** Maximum content items per post */
  maxContentItems: 50,
  /** Maximum images per post */
  maxImagesPerPost: 10,
  /** Maximum file size for uploads (in bytes) */
  maxFileSize: 5 * 1024 * 1024, // 5MB
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

/**
 * Standard error messages
 */
export const ERROR_MESSAGES = {
  /** Generic error message */
  generic: 'Something went wrong. Please try again.',
  /** Network error message */
  network: 'Network error. Please check your connection.',
  /** Not found error message */
  notFound: 'The requested resource was not found.',
  /** Unauthorized error message */
  unauthorized: 'You are not authorized to perform this action.',
  /** Validation error message */
  validation: 'Please check your input and try again.',
} as const;

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

/**
 * Performance-related constants
 */
export const PERFORMANCE_CONFIG = {
  /** Debounce delay for search inputs */
  searchDebounceDelay: 300,
  /** Throttle delay for scroll events */
  scrollThrottleDelay: 16, // ~60fps
  /** Intersection observer threshold */
  intersectionThreshold: 0.1,
  /** Image lazy loading threshold */
  imageLazyLoadThreshold: 100,
} as const;
