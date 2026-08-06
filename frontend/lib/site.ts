// Canonical public origin. Override with NEXT_PUBLIC_SITE_URL when running
// somewhere other than production (local dev, a preview tunnel, etc).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kyle.wongworks.dev'
).replace(/\/$/, '')
