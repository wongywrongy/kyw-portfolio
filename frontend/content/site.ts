import data from './site.json'
import { validateImage } from '@/lib/href'

// Edit site.json (or in Pages CMS). Leave a link empty to hide it, and leave
// `avatar` empty to show no photo.
validateImage('content/site.json', 'avatar', data.avatar)

export const site = {
  ...data,
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kyle.wongworks.dev').replace(/\/$/, ''),
}
