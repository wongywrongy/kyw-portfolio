import { validateHrefs } from '@/lib/href'

export type Project = {
  name: string
  description: string
  stack?: string[]
  href?: string
}

export const projects: Project[] = [
  {
    name: 'Yunavero',
    href: 'https://yunavero.com',
    description:
      'Tournament operations software for badminton, used for events between SJSU, UC Berkeley, UCSC and Stanford.',
    stack: ['OR-Tools CP-SAT, FastAPI, PostgreSQL, React'],
  },
  {
    name: 'CommonGround',
    href: 'https://sfhacks26.vercel.app/',
    description: 'Group tenant screening for shared rentals. 2nd place at SF Hacks 2026.',
    stack: ['React', 'Express', 'MongoDB', 'Gemini'],
  },
  {
    name: 'Homelab',
    href: '',
    description:
      'Three-node home and office infrastructure that hosts my projects, including Yunavero and this site.',
    stack: ['Docker, Tailscale, Cloudflare Tunnel, SigNoz'],
  },
  {
    name: 'Fixture Plan Analyzer',
    href: '',
    description:
      'Extracts fixtures and specs from construction floor plans, built at JK Baker Construction.',
    stack: ['OCR, Computer Vision, Local LLMs'],
  },
  {
    name: 'Debian',
    href: '',
    description:
      'Triaged FFmpeg package bugs across x86 and ARM for Debian maintainers.',
    stack: ['C, Bash, Linux'],
  },
]

validateHrefs('content/projects.ts', projects)
