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
    role: 'Software Engineer',
  },
  {
    company: 'JK Baker Construction',
    href: '',
    role: 'Software Engineering Contractor',
    description:
      'Internal tools for a San Jose general contractor: document collection, lease abstraction, and a self-hosted bank-document pipeline.',
  },
  {
    company: 'Spartan Racing',
    href: '',
    role: 'Software Engineer',
    period: 'Aug 2025 – Mar 2026',
    description: 'Torque vectoring and the AMK motor/inverter integration, in C on Linux.',
  },
]

validateHrefs('content/work.ts', work)
