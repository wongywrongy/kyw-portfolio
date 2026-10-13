import { validateHrefs } from '@/lib/href'

export type Entry = {
  kind: 'work' | 'education'
  org: string
  role: string
  /** YYYY-MM */
  start: string
  /** YYYY-MM. Leave it out for something you are still doing. */
  end?: string
  /** One line. Shown on the homepage; keep it short. */
  description?: string
  href?: string
}

/** Newest first. The homepage shows the first five; the rest are on /experience. */
export const experience: Entry[] = [
  {
    kind: 'work',
    org: 'Spartan Racing',
    role: 'Junior Software Engineer',
    start: '2025-08',
    end: '2026-03',
    description: 'Motor controller and torque vectoring code in C for the Formula SAE EV.',
    href: '',
  },
  {
    kind: 'education',
    org: '성균관대학교 · Sungkyunkwan University',
    role: 'Exchange semester, artificial intelligence',
    // TODO: confirm the semester.
    start: '2025-03',
    end: '2025-06',
    href: '',
  },
  {
    kind: 'work',
    org: 'JK Baker Construction',
    role: 'Software Engineer Intern',
    start: '2024-06',
    end: '2024-08',
    description: 'Document pipelines and a fixture-plan analyzer for a general contractor.',
    href: '',
  },
  {
    kind: 'education',
    org: 'San José State University',
    role: 'B.S. Computer Science',
    // TODO: confirm the start year.
    start: '2023-08',
    end: '2027-12',
    href: '',
  },
]

validateHrefs('content/experience.ts', experience.map((e) => ({ name: e.org, href: e.href })))

for (const e of experience) {
  for (const [key, value] of Object.entries({ start: e.start, end: e.end })) {
    if (value !== undefined && !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
      throw new Error(`content/experience.ts: "${e.org}" ${key} must be YYYY-MM (got "${value}")`)
    }
  }
}
