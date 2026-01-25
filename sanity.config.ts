/**
 * Sanity CMS Configuration
 * 
 * This file configures Sanity CMS for the portfolio website.
 * Run: npx sanity init to set up your Sanity project
 */

export default {
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: process.env.VITE_SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
}
