export const site = {
  name: 'Kyle Wong',
  role: 'Software engineer · CS at SJSU',
  bio: [
    'I study computer science at San José State University and spent a semester studying artificial intelligence at 성균관대학교 in Seoul.',
    'I build side projects around the things I care about: badminton, books, travel and new technology.',
  ],
  // Leave a value empty to hide that link.
  links: {
    email: '',
    github: 'https://github.com/wongywrongy',
    linkedin: 'https://www.linkedin.com/in/ktwong665/',
    resume: '', // e.g. '/resume.pdf' with the file in public/
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kyle.wongworks.dev').replace(/\/$/, ''),
  title: 'Kyle’s Portfolio',
  description: 'Kyle Wong - swe and cs at sjsu',
}
