/**
 * Shared Type Definitions
 * 
 * This file contains all the core type definitions used across the application.
 * Types are organized by domain and follow TypeScript best practices.
 */

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Theme variant enumeration
 * Defines the available theme modes for the application
 */
export type ThemeVariant = 'light' | 'dark';

/**
 * Theme context interface
 * Defines the structure of the theme context provider
 */
export interface ThemeContextType {
  /** Current theme variant */
  theme: ThemeVariant;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

// ============================================================================
// CONTENT TYPES
// ============================================================================

/**
 * Blog post content item types
 * Defines the different types of content that can be rendered in blog posts
 */
export type ContentItemType = 'text' | 'heading' | 'latex' | 'code' | 'list' | 'image';

/**
 * Blog post content item interface
 * Represents a single piece of content within a blog post
 */
export interface ContentItem {
  /** Type of content item */
  type: ContentItemType;
  /** Text content for text and heading items */
  content?: string;
  /** Paragraphs array for text blocks (preserves line breaks) */
  paragraphs?: string[];
  /** Heading level for heading items (1-6) */
  level?: number;
  /** Whether LaTeX should be displayed as block or inline */
  display?: boolean;
  /** Programming language for code blocks */
  language?: string;
  /** Filename for code blocks */
  filename?: string;
  /** Code content (alternative to content for code blocks) */
  code?: string;
  /** List items for list type */
  items?: string[];
  /** Whether list is ordered (numbered) */
  ordered?: boolean;
  /** Image source URL */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Image caption */
  caption?: string;
  /** Image size preset */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Image width (overrides size if provided) */
  width?: number | string;
  /** Image height */
  height?: number;
  /** Image alignment */
  align?: 'left' | 'center' | 'right';
  /** Image quality setting */
  quality?: 'low' | 'medium' | 'high' | 'original';
  /** Image format */
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
  /** Whether content should break out of container (full width) */
  fullWidth?: boolean;
}

/**
 * Blog image interface
 * Represents an image associated with a blog post
 */
export interface BlogImage {
  /** Image source URL */
  src: string;
  /** Image alt text for accessibility */
  alt: string;
  /** Optional image caption */
  caption?: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
}

/**
 * Blog post interface
 * Represents a complete blog post with all metadata and content
 */
export interface BlogPost {
  /** Unique identifier for the post */
  id: number;
  /** Post title */
  title: string;
  /** URL slug for the post */
  slug: string;
  /** Brief description/excerpt */
  excerpt: string;
  /** Publication date in YYYY-MM-DD format */
  date: string;
  /** Estimated reading time */
  readTime: string;
  /** Structured content items */
  content?: ContentItem[];
  /** Associated images */
  images?: BlogImage[];
}

/**
 * About section image interface
 * Represents an image in an about section
 */
export interface AboutSectionImage {
  /** Image source path (from public folder) */
  src: string;
  /** Image alt text */
  alt: string;
  /** Optional image caption */
  caption?: string;
  /** Image width (optional, defaults to 800) */
  width?: number;
  /** Image height (optional, defaults to 400) */
  height?: number;
}

/**
 * About section interface
 * Represents a single section in the about page
 */
export interface AboutSection {
  /** Section title */
  title: string;
  /** Section content */
  content: string;
  /** Optional images to display in this section */
  images?: AboutSectionImage[];
}

/**
 * About content interface
 * Represents the complete about page content
 */
export interface AboutContent {
  /** Page title */
  title: string;
  /** Array of about sections */
  sections: AboutSection[];
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

/**
 * Blog image component props
 * Props for the BlogImage component
 */
export interface BlogImageProps {
  /** Image source URL */
  src: string;
  /** Image alt text */
  alt: string;
  /** Optional image caption */
  caption?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Additional CSS classes */
  className?: string;
  /** Image quality setting */
  quality?: 'low' | 'medium' | 'high' | 'original';
  /** Image format */
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
}

/**
 * Code block component props
 * Props for the CodeBlock component
 */
export interface CodeBlockProps {
  /** Code content */
  children: string;
  /** Programming language */
  language?: string;
  /** Optional filename */
  filename?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * LaTeX component props
 * Props for the LaTeX component
 */
export interface LaTeXProps {
  /** LaTeX content */
  children: string;
  /** Whether to display as block or inline */
  display?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Content renderer component props
 * Props for the ContentRenderer component
 */
export interface ContentRendererProps {
  /** Array of content items to render */
  content: ContentItem[];
  /** Additional CSS classes */
  className?: string;
}


// ============================================================================
// NAVIGATION TYPES
// ============================================================================

/**
 * Menu item interface
 * Represents a single menu item in the navigation
 */
export interface MenuItem {
  /** Display label */
  label: string;
  /** Navigation path */
  path: string;
  /** Description text */
  description: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Generic API response wrapper
 * Standard response format for API calls
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Success status */
  success: boolean;
  /** Error message if any */
  error?: string;
}

/**
 * Generic pagination parameters
 * Standard pagination interface
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
}

/**
 * Generic paginated response
 * Standard paginated response format
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  items: T[];
  /** Total number of items */
  total: number;
  /** Current page number */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}
