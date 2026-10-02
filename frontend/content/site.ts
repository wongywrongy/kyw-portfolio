export const site = {
  name: 'Kyle Wong',
  role: 'SWE, CS @ SJSU',
  bio: [
    'Hey there, I computer science at San Jose State and studied artificial intelligence abroad at 성균관대학교 in South Korea for a semester.',
    'I love developing side projects related to my own passions. Those passions are playing badminton, reading books, travelling, and exploring new technologies.',
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
