import { validateHrefs } from '@/lib/href'

export type Project = {
  name: string
  description: string
  stack?: string[]
  href?: string
}

export const projects: Project[] = [
  {
    name: 'ShuttleWorks',
    href: '',
    description:
      'Tournament scheduler for collegiate badminton, used for events between SJSU, UC Berkeley, UCSC and Stanford.',
    stack: ['OR-Tools CP-SAT', 'FastAPI', 'React'],
  },
  {
    name: 'CommonGround',
    href: '',
    description: 'Group tenant screening for shared rentals. 2nd place at SF Hacks 2026.',
    stack: ['React', 'Express', 'MongoDB', 'Gemini'],
  },
  {
    name: 'Bay Badminton',
    href: '',
    description:
      'Rebuilt a badminton center’s legacy website as one system the staff can update themselves.',
    stack: ['Next.js', 'Sanity', 'Cloudflare'],
  },
  {
    name: 'BadmintonCut',
    href: '',
    description:
      'Finds where rallies start and end in match footage, with a review app for the edge cases.',
    stack: ['Qwen3-VL', 'TrackNetV3', 'SAM 2.1', 'Electron'],
  },
  {
    name: 'Citegraph',
    href: '',
    description: 'Explore how court opinions cite each other as an interactive graph.',
    stack: ['Eyecite', 'Postgres + pgvector', 'Sigma.js'],
  },
  {
    name: 'Ara',
    href: '',
    description:
      'Home voice assistant that speaks Korean, English and Mandarin, running entirely on my own server.',
    stack: ['Qwen3', 'STT → LLM → TTS'],
  },
]

validateHrefs('content/projects.ts', projects)
