import { config, collection, fields } from '@keystatic/core'

/**
 * The post editor, served at /keystatic by the `editor` container on neo
 * (tailnet only). Local storage: saving writes straight to content/posts/ and
 * public/images/posts/ in the checkout, and ./publish.sh commits, pushes and
 * rebuilds the public site.
 *
 * The public static export never includes this: see pageExtensions in
 * next.config.mjs.
 */
const images = { directory: 'public/images/posts', publicPath: '/images/posts/' }

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Mindspace' } },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['date', 'draft'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
        summary: fields.text({ label: 'Summary', description: 'One line, used for link previews and the Mindspace list.' }),
        draft: fields.checkbox({ label: 'Draft', description: 'Drafts are hidden from the public site.', defaultValue: true }),
        cover: fields.image({ label: 'Cover image', description: 'Optional. Shown in duotone on the homepage card and in full on the post.', ...images }),
        content: fields.mdx({
          label: 'Content',
          options: { image: images },
        }),
      },
    }),
  },
})
