import data from './work.json'
import { validateHrefs, validateImage } from '@/lib/href'

export type Job = {
  company: string
  role: string
  period?: string
  description?: string
  href?: string
  logo?: string
}

// Edit work.json (or in Pages CMS).
export const work: Job[] = data

validateHrefs('content/work.json', work)
for (const job of work) validateImage('content/work.json', `"${job.company}" logo`, job.logo)
