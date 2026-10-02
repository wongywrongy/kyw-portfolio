export const site = {
  name: 'Kyle Wong',
  role: 'Software engineer, SJSU CS ’27',
  bio: [
    'I study computer science at San José State and build software people actually use: a tournament scheduler several Bay Area schools run their badminton events on, internal tools for a construction company, and a few services on my home server.',
    'I’ve played and coached badminton for over ten years, which is why half the projects below involve shuttlecocks.',
  ],
  // Leave a value empty to hide that link.
  links: {
    email: '',
    github: 'https://github.com/wongywrongy',
    linkedin: '',
    resume: '', // e.g. '/resume.pdf' with the file in public/
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kyle.wongworks.dev').replace(/\/$/, ''),
  title: 'Kyle Wong',
  description: 'Kyle Wong — software engineer and CS student at San José State.',
}
