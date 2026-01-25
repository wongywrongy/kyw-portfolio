/**
 * Sanity CMS Client with Proxy
 * 
 * This file sets up a custom fetch function that uses a proxy
 * to avoid CORS issues. Data is fetched server-side via proxy on each page load.
 * 
 * Environment variables:
 * - VITE_SANITY_PROJECT_ID: Your Sanity project ID
 * - VITE_SANITY_DATASET: Your dataset name (usually 'production')
 * - VITE_PROXY_URL: Optional proxy URL (defaults to corsproxy.io)
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Get environment variables with fallbacks
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// API route URL - points to the Express server or serverless function
// For local dev: uses Express server on port 3001
// For production: set VITE_API_ROUTE to your deployed server URL
// If not set in production, will try /api/sanity-proxy (Vercel/Netlify)
const apiRoute = import.meta.env.VITE_API_ROUTE || 
  (import.meta.env.DEV 
    ? 'http://localhost:3001/api/sanity'  // Local Express server
    : '/api/sanity-proxy');  // Production serverless function (Vercel/Netlify)

// Validate required configuration
if (!projectId) {
  console.error('VITE_SANITY_PROJECT_ID is required. Please set it in your .env file.');
} else {
  console.log('Sanity client configured:', { projectId, dataset, apiRoute });
}

/**
 * Fetch function that uses your API route (like Next.js API routes)
 * If you have a backend/router API, this will use that instead of proxies
 */
async function fetchViaProxy(query: string, params?: Record<string, any>) {
  // Use your API route (works with Next.js, Express, or any backend)
  const url = new URL(apiRoute, window.location.origin);
  url.searchParams.set('query', query);
  
  if (params) {
    url.searchParams.set('params', JSON.stringify(params));
  }
  
  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Your API should return { result: ... } or just the data directly
    return data.result || data;
  } catch (error) {
    console.error('API route fetch error:', error);
    throw error;
  }
}

// Create a client-like object that uses the proxy
const client = {
  fetch: fetchViaProxy,
};

// Image URL builder for Sanity images
// Images can use CDN directly (no CORS issues with images)
const imageBuilderClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true, // Images can use CDN (no CORS issues with images)
});

const builder = imageUrlBuilder(imageBuilderClient);

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
