import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function seed() {
  console.log('Seeding database...')

  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')

  const payload = await getPayload({ config })

  // --- Seed SiteSettings global ---
  console.log('Seeding SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      hero: {
        greeting: "Hey, I'm",
        name: 'Kyle Wong',
        tagline: 'Designer & developer creating thoughtful digital experiences.',
      },
      links: {
        email: 'hello@example.com',
        linkedinUrl: 'https://linkedin.com/in/kylewong',
        githubUrl: 'https://github.com/kylewong',
      },
      site: {
        siteTitle: 'Kyle Wong — Portfolio',
        siteDescription: 'Designer & developer creating thoughtful digital experiences.',
        resumeUrl: '',
      },
    },
  })
  console.log('  SiteSettings seeded.')

  // --- Seed Work Experiences ---
  console.log('Seeding Work Experiences...')
  const workExperiences = [
    {
      company: 'Company A',
      role: 'Software Engineer',
      period: '2023 – Present',
      description: 'Building modern web applications with React and Next.js.',
      order: 1,
    },
    {
      company: 'Company B',
      role: 'Frontend Developer',
      period: '2021 – 2023',
      description: 'Developed responsive UI components and design systems.',
      order: 2,
    },
  ]

  for (const exp of workExperiences) {
    await payload.create({ collection: 'work-experiences', data: exp })
  }
  console.log(`  ${workExperiences.length} work experiences seeded.`)

  // --- Seed Projects ---
  console.log('Seeding Projects...')
  const projects = [
    {
      title: 'Portfolio Website',
      subtitle: 'Personal Site',
      description: 'A minimalist portfolio built with Next.js and Payload CMS.',
      link: 'https://example.com',
      tags: [{ tag: 'Next.js' }, { tag: 'Payload CMS' }],
      order: 1,
    },
    {
      title: 'Design System',
      subtitle: 'Component Library',
      description: 'A shared component library for consistent UI across projects.',
      tags: [{ tag: 'React' }, { tag: 'TypeScript' }],
      order: 2,
    },
  ]

  for (const project of projects) {
    await payload.create({ collection: 'projects', data: project })
  }
  console.log(`  ${projects.length} projects seeded.`)

  // --- Seed Blog Posts ---
  console.log('Seeding Blog Posts...')
  const posts = [
    {
      title: 'Getting Started with Payload CMS',
      slug: 'getting-started-with-payload-cms',
      publishedAt: 'Jan 2025',
      excerpt: 'A guide to setting up Payload CMS with Next.js for your portfolio site.',
      category: 'Development' as const,
      status: 'published' as const,
      order: 1,
    },
    {
      title: 'Design Principles for Developers',
      slug: 'design-principles-for-developers',
      publishedAt: 'Dec 2024',
      excerpt: 'Key design principles that every developer should know to create better user interfaces.',
      category: 'Design' as const,
      status: 'published' as const,
      order: 2,
    },
  ]

  for (const post of posts) {
    await payload.create({ collection: 'posts', data: post })
  }
  console.log(`  ${posts.length} blog posts seeded.`)

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
