// Sanitizers for URLs that originate from the CMS.
//
// Payload stores these as free-text fields, so an editor (or anyone who gains
// access to the admin panel) could save `javascript:` or `data:` URLs that would
// execute when rendered into an href. Everything below returns undefined for
// anything that is not a plain navigable link.

const SAFE_PROTOCOLS = ['http:', 'https:']

// Resolve against a dummy origin so root-relative links like `/resume.pdf` parse.
const RELATIVE_BASE = 'https://relative.invalid'

export function safeUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined

  const trimmed = value.trim()
  if (!trimmed) return undefined

  let parsed: URL
  try {
    parsed = new URL(trimmed, RELATIVE_BASE)
  } catch {
    return undefined
  }

  if (!SAFE_PROTOCOLS.includes(parsed.protocol)) return undefined

  return trimmed
}

export function safeMailto(email: string | null | undefined): string | undefined {
  if (!email) return undefined

  const trimmed = email.trim()
  // Deliberately strict: a single address, no scheme, no header-injecting characters.
  if (!/^[^\s@<>:;,"'\\]+@[^\s@<>:;,"'\\]+\.[^\s@<>:;,"'\\]+$/.test(trimmed)) {
    return undefined
  }

  return `mailto:${trimmed}`
}
