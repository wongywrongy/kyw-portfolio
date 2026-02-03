import { createClient, type SanityClient } from '@sanity/client'

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Check if Sanity is properly configured
export const isSanityConfigured = Boolean(projectId)

// Create client with placeholder if env var is missing (allows build to pass)
// The placeholder 'placeholder' is only used during build when env vars aren't available
export const client: SanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Warn at runtime if not configured
if (typeof window !== 'undefined' && !isSanityConfigured) {
  console.warn(
    '[Sanity] Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. ' +
    'Content will not load. Please add it to your .env.local file.'
  )
}
