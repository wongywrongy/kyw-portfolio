import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/lib/payload/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  hooks: {
    // `/work/all` also renders resumeUrl, so it goes stale with the homepage.
    afterChange: [revalidateGlobalAfterChange(['/', '/work/all'])],
  },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        {
          name: 'greeting',
          type: 'text',
          defaultValue: "Hey, I'm",
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'tagline',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'links',
      label: 'Social Links',
      fields: [
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'linkedinUrl',
          type: 'text',
        },
        {
          name: 'githubUrl',
          type: 'text',
        },
      ],
    },
    {
      type: 'group',
      name: 'site',
      label: 'Site Info',
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
        },
        {
          name: 'siteDescription',
          type: 'textarea',
        },
        {
          name: 'resumeUrl',
          type: 'text',
          admin: {
            description: 'URL to your resume PDF',
          },
        },
      ],
    },
  ],
}
