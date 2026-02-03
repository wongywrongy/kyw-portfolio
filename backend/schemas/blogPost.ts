import { defineType, defineField } from 'sanity'

// ============================================
// BLOG POSTS (MINDSPACE)
// ============================================
// Your thoughts, articles, and insights.
// Supports rich content: images, code blocks, and more.
//
// HOW TO EDIT:
// 1. Go to "Blog Posts" in the sidebar
// 2. Click "+ Create" to write a new post
// 3. Use the content editor to add text, images, and code
// ============================================

export default defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  
  fields: [
    // ----------------------------------------
    // BASIC INFO
    // ----------------------------------------
    
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'The headline of your blog post',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL path for this post (click Generate)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Display date (e.g., "Jan 15, 2024")',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      description: 'A brief preview shown in the list',
      validation: (Rule) => Rule.required(),
    }),
    
    // ----------------------------------------
    // FEATURED IMAGE
    // ----------------------------------------
    
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image shown at the top of the post',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility',
        },
      ],
    }),
    
    // ----------------------------------------
    // CATEGORIZATION
    // ----------------------------------------
    
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'What topic does this post cover?',
      options: {
        list: [
          { title: 'Design', value: 'Design' },
          { title: 'Development', value: 'Development' },
          { title: 'Process', value: 'Process' },
          { title: 'Career', value: 'Career' },
          { title: 'Personal', value: 'Personal' },
          { title: 'Tutorial', value: 'Tutorial' },
        ],
      },
    }),
    
    // ----------------------------------------
    // FULL CONTENT
    // ----------------------------------------
    // Note: Read time is auto-calculated from word count
    
    defineField({
      name: 'content',
      title: 'Post Content',
      type: 'array',
      description: 'Write your full blog post here',
      of: [
        // Rich text blocks
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
        // Images
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption below the image',
            },
          ],
        },
        // Code blocks
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'Python', value: 'python' },
                  { title: 'Bash / Shell', value: 'bash' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Markdown', value: 'markdown' },
                  { title: 'Plain Text', value: 'text' },
                ],
              },
            },
            {
              name: 'filename',
              title: 'Filename',
              type: 'string',
              description: 'Optional filename to display (e.g., "index.js")',
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 10,
            },
          ],
          preview: {
            select: {
              language: 'language',
              filename: 'filename',
              code: 'code',
            },
            prepare({ language, filename, code }) {
              return {
                title: filename || `${language || 'Code'} block`,
                subtitle: code ? code.substring(0, 50) + '...' : '',
              }
            },
          },
        },
      ],
    }),
    
    // ----------------------------------------
    // ATTACHMENTS
    // ----------------------------------------

    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      description: 'Add PDF files or other documents to this post',
      of: [
        {
          type: 'file',
          title: 'File',
          options: {
            accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'Display name for this file',
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'Brief description of the file contents',
            },
          ],
        },
      ],
    }),

    // ----------------------------------------
    // ORDERING
    // ----------------------------------------

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...)',
      initialValue: 0,
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },
  
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
