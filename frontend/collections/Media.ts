import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    // The only consumer is the blog featured image, so keep the upload surface
    // narrow rather than accepting arbitrary file types (e.g. .svg with script,
    // .html) that would then be served from our own origin.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
  },
}
