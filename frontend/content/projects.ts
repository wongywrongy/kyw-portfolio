import data from './projects.json'
import { validateHrefs } from '@/lib/href'

export type Project = {
  name: string
  description: string
  stack?: string[]
  href?: string
}

const str = (v: unknown) => (typeof v === 'string' ? v : '')

// Edit projects.json (or in Pages CMS). Read loosely so an empty field saved
// as null or left out never breaks the build.
export const projects: Project[] = (data as Record<string, unknown>[]).map((p) => ({
  name: str(p.name),
  description: str(p.description),
  href: str(p.href),
  stack: Array.isArray(p.stack) ? p.stack.map(str).filter(Boolean) : [],
}))

validateHrefs('content/projects.json', projects)
