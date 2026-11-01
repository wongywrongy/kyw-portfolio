import data from './projects.json'
import { validateHrefs } from '@/lib/href'

export type Project = {
  name: string
  description: string
  stack?: string[]
  href?: string
}

// Edit projects.json (or in Pages CMS).
export const projects: Project[] = data

validateHrefs('content/projects.json', projects)
