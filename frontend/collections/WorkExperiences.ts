import type { CollectionConfig } from 'payload'

export const WorkExperiences: CollectionConfig = {
  slug: 'work-experiences',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'period', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  defaultSort: 'order',
}
