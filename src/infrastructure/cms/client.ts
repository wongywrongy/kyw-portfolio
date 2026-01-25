/**
 * Sanity CMS Client
 * 
 * This file sets up the Sanity client for fetching content.
 * Using API endpoint (not CDN) to avoid CORS issues.
 * 
 * Environment variables:
 * - VITE_SANITY_PROJECT_ID: Your Sanity project ID
 * - VITE_SANITY_DATASET: Your dataset name (usually 'production')
 * - VITE_SANITY_TOKEN: Optional read token for production (recommended)
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Get environment variables with fallbacks
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const token = import.meta.env.VITE_SANITY_TOKEN;

// Validate required configuration
if (!projectId) {
  console.error('VITE_SANITY_PROJECT_ID is required. Please set it in your .env file.');
} else {
  console.log('Sanity client configured:', { projectId, dataset, useCdn: false });
}

// Create Sanity client
// Using API endpoint (useCdn: false) to avoid CORS issues
// The API endpoint has proper CORS headers configured
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // Use API endpoint to avoid CORS issues (CDN may have restrictions)
  token, // Optional: Add read token for production (recommended for security)
  perspective: 'published', // Only fetch published content in production
});

// Image URL builder for Sanity images
// Images will still use CDN URLs (which is fine for images)
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image source
 * Automatically uses CDN for production, handles all image transformations
 * 
 * @param source - Sanity image source (from content)
 * @returns Image URL builder instance for chaining transformations
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get production-ready image URL with optional transformations
 * 
 * @param source - Sanity image source
 * @param options - Optional image transformation options
 * @returns Optimized image URL
 */
export function getImageUrl(
  source: SanityImageSource,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp';
  }
) {
  let image = builder.image(source);
  
  if (options?.width) image = image.width(options.width);
  if (options?.height) image = image.height(options.height);
  if (options?.quality) image = image.quality(options.quality);
  if (options?.format) image = image.format(options.format);
  
  return image.url();
}

export default client;
