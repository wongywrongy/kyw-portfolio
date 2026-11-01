import data from './site.json'
import { validateImage } from '@/lib/href'

// Edit site.json (or in Pages CMS). Leave a link empty to hide it, and leave
// `avatar` empty to show no photo.
const raw = data as Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : '')
const links = (raw.links ?? {}) as Record<string, unknown>

export const site = {
  name: str(raw.name),
  role: str(raw.role),
  avatar: str(raw.avatar),
  bio: Array.isArray(raw.bio) ? raw.bio.map(str).filter(Boolean) : [],
  links: {
    email: str(links.email),
    github: str(links.github),
    linkedin: str(links.linkedin),
    resume: str(links.resume),
  },
  title: str(raw.title),
  description: str(raw.description),
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kyle.wongworks.dev').replace(/\/$/, ''),
}

validateImage('content/site.json', 'avatar', site.avatar)
