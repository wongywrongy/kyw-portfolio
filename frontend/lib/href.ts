/**
 * Build-time check for an image path (avatar, logo, post cover). Empty is fine;
 * anything else must be a site path like /images/logo.png, i.e. a file in public/.
 */
export function validateImage(file: string, field: string, value: string | undefined) {
  if (!value) return
  if (!value.startsWith('/') || value.startsWith('//')) {
    throw new Error(`${file}: ${field} must be a path starting with / such as /images/x.png (got "${value}")`)
  }
}

/**
 * Build-time check for the `href` field on work and project entries.
 * Empty is fine (the row stays plain text); anything else must be a full
 * https:// URL or a site path starting with /.
 */
export function validateHrefs(file: string, entries: { href?: string; company?: string; name?: string }[]) {
  for (const entry of entries) {
    const href = entry.href ?? ''
    if (href === '') continue
    const ok = href.startsWith('https://') || (href.startsWith('/') && !href.startsWith('//'))
    if (!ok) {
      throw new Error(
        `${file}: "${entry.name ?? entry.company}" href must start with https:// or / (got "${href}")`,
      )
    }
  }
}
