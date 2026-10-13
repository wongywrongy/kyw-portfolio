import { validateHrefs } from '@/lib/href'

export type Job = {
  company: string
  role: string
  /** YYYY-MM */
  start: string
  /** YYYY-MM, or leave it out for a job you still have. */
  end?: string
  description?: string
  href?: string
}

export const work: Job[] = [
  {
    company: 'JK Baker Construction',
    href: '',
    role: 'Software Engineer Intern',
    start: '2024-06',
    end: '2024-08',
  },
  {
    company: 'Spartan Racing',
    href: '',
    role: 'Junior Software Engineer',
    start: '2025-08',
    end: '2026-03',
  },
]

validateHrefs('content/work.ts', work)

for (const job of work) {
  for (const [key, value] of Object.entries({ start: job.start, end: job.end })) {
    if (value !== undefined && !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
      throw new Error(`content/work.ts: "${job.company}" ${key} must be YYYY-MM (got "${value}")`)
    }
  }
}
