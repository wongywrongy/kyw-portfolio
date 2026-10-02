import { validateHrefs } from '@/lib/href'

export type Job = {
  company: string
  role: string
  period?: string
  description?: string
  href?: string
}

export const work: Job[] = [
  {
    company: 'Yunavero',
    href: '',
    period: 'Present',
    role: 'Software Engineer Intern',
  },
  {
    company: 'JK Baker Construction',
    href: '',
    role: 'Software Engineer Intern',
    period: 'Jun 2024 to Aug 2024',
  },
  {
    company: 'Spartan Racing',
    href: '',
    role: 'Software Engineer',
    period: 'Aug 2025 to Mar 2026',
  },
]

validateHrefs('content/work.ts', work)
