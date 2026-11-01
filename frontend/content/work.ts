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

const str = (v: unknown) => (typeof v === 'string' ? v : '')

// Edit work.json (or in Pages CMS). Read loosely so an empty field saved as
// null or left out never breaks the build.
export const work: Job[] = (data as Record<string, unknown>[]).map((j) => ({
  company: str(j.company),
  role: str(j.role),
  period: str(j.period),
  description: str(j.description),
  href: str(j.href),
  logo: str(j.logo),
}))

validateHrefs('content/work.json', work)
for (const job of work) validateImage('content/work.json', `"${job.company}" logo`, job.logo)
