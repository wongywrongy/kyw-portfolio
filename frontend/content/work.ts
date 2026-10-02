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
    role: 'Software Engineer',
  },
  {
    company: 'JK Baker Construction',
    role: 'Software Engineering Contractor',
    description:
      'Internal tools for a San Jose general contractor: document collection, lease abstraction, and a self-hosted bank-document pipeline.',
  },
  {
    company: 'Spartan Racing',
    role: 'Software Engineer',
    period: 'Aug 2025 – Mar 2026',
    description: 'Torque vectoring and the AMK motor/inverter integration, in C on Linux.',
  },
]
