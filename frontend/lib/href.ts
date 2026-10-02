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
