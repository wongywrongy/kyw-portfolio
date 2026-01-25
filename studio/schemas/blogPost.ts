/**
 * Blog Post Schema
 * 
 * This schema defines the structure for blog posts.
 * Supports rich text, code blocks, LaTeX, and images throughout the content.
 */

import { defineType } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  description: 'Create and manage blog posts. You can add images, code blocks, and formatted text throughout your posts.',
  fields: [
    {
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'The main title of your blog post. This will appear on the blog listing page and at the top of the post.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-friendly version of your title (e.g., "my-first-post"). This is automatically generated from the title, but you can customize it.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary of your post. This appears on the blog listing page to give readers a preview. It will be automatically truncated if too long.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      description: 'The date when this post was published. Posts are sorted by date, with newest first.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'Estimated reading time (e.g., "5 min read"). This helps readers know how long the post will take to read.',
      initialValue: '5 min read',
    },
    {
      name: 'tag',
      title: 'Post Tag',
      type: 'object',
      description: 'A colored tag that appears above the title. Use this to categorize or highlight your post.',
      fields: [
        {
          name: 'text',
          title: 'Tag Text',
          type: 'string',
          description: 'The text to display on the tag (e.g., "Project", "Research", "Tutorial").',
          validation: (Rule) => Rule.max(20),
        },
        {
          name: 'color',
          title: 'Tag Color',
          type: 'string',
          description: 'Choose a color for the tag. This will create a nice visual flow into the title.',
          options: {
            list: [
              { title: 'Blue', value: 'blue' },
              { title: 'Purple', value: 'purple' },
              { title: 'Pink', value: 'pink' },
              { title: 'Green', value: 'green' },
              { title: 'Orange', value: 'orange' },
              { title: 'Red', value: 'red' },
              { title: 'Teal', value: 'teal' },
              { title: 'Indigo', value: 'indigo' },
            ],
          },
          initialValue: 'blue',
        },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'A featured image that appears at the top of your blog post. Upload any image file (JPG, PNG, etc.).',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'A description of the image for accessibility and SEO (e.g., "Screenshot of the application interface").',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'An optional caption that appears below the image.',
        },
      ],
    },
    {
      name: 'content',
      title: 'Post Content',
      type: 'array',
      description: 'The main content of your blog post. You can add text, headings, images, code blocks, and more. Click "Add item" to add new content blocks.',
      of: [
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          description: 'A paragraph or block of text. Use this for regular content.',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'text',
              readOnly: true,
            },
            {
              name: 'content',
              title: 'Text Content',
              type: 'text',
              description: 'Write your text content here. You can use multiple paragraphs by pressing Enter.',
            },
          ],
        },
        {
          type: 'object',
          name: 'headingBlock',
          title: 'Heading',
          description: 'A heading to break up your content into sections.',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'heading',
              readOnly: true,
            },
            {
              name: 'level',
              title: 'Heading Level',
              type: 'number',
              description: 'Heading size: 1 = largest (main section), 2 = medium (subsection), 3 = smallest (sub-subsection).',
              options: {
                list: [1, 2, 3],
              },
              validation: (Rule) => Rule.required().min(1).max(3),
            },
            {
              name: 'content',
              title: 'Heading Text',
              type: 'string',
              description: 'The text of your heading.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          description: 'Add an image anywhere in your post. Upload an image file and add a description.',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'image',
              readOnly: true,
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Upload an image file (JPG, PNG, GIF, etc.).',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'A description of the image for accessibility (required).',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption that appears below the image.',
            },
            {
              name: 'size',
              title: 'Image Size',
              type: 'string',
              description: 'Choose how large the image appears relative to the text. Small images are about 50% width, medium is 75%, large is 90%, and full-width uses the entire container.',
              options: {
                list: [
                  { title: 'Small (50% width)', value: 'small' },
                  { title: 'Medium (75% width)', value: 'medium' },
                  { title: 'Large (90% width)', value: 'large' },
                  { title: 'Full Width (100%)', value: 'full' },
                ],
              },
              initialValue: 'medium',
            },
            {
              name: 'width',
              title: 'Custom Width (Advanced)',
              type: 'string',
              description: 'Optional: Override size with a custom width (e.g., "600px" or "80%"). Leave empty to use the size option above.',
            },
            {
              name: 'align',
              title: 'Alignment',
              type: 'string',
              description: 'How the image should be aligned on the page.',
              options: {
                list: ['left', 'center', 'right'],
              },
              initialValue: 'center',
            },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          description: 'Add a code block with syntax highlighting. Specify the programming language.',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'code',
              readOnly: true,
            },
            {
              name: 'language',
              title: 'Programming Language',
              type: 'string',
              description: 'The programming language for syntax highlighting (e.g., "javascript", "python", "typescript", "bash").',
              options: {
                list: [
                  'javascript',
                  'typescript',
                  'python',
                  'java',
                  'cpp',
                  'c',
                  'bash',
                  'html',
                  'css',
                  'json',
                  'yaml',
                  'markdown',
                  'sql',
                  'rust',
                  'go',
                ],
              },
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              description: 'Paste your code here. It will be formatted with syntax highlighting.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          type: 'object',
          name: 'latexBlock',
          title: 'LaTeX Math',
          description: 'Add mathematical equations using LaTeX syntax (e.g., $E = mc^2$).',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'latex',
              readOnly: true,
            },
            {
              name: 'content',
              title: 'LaTeX Formula',
              type: 'string',
              description: 'Enter your LaTeX formula (e.g., "E = mc^2" or "\\sum_{i=1}^{n} x_i").',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'display',
              title: 'Display Mode',
              type: 'boolean',
              description: 'Check this for block-level equations (centered, larger). Uncheck for inline equations.',
              initialValue: false,
            },
          ],
        },
        {
          type: 'object',
          name: 'listBlock',
          title: 'List',
          description: 'Create a bulleted or numbered list.',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'list',
              readOnly: true,
            },
            {
              name: 'ordered',
              title: 'Ordered List',
              type: 'boolean',
              description: 'Check for numbered list, uncheck for bullet points.',
              initialValue: false,
            },
            {
              name: 'items',
              title: 'List Items',
              type: 'array',
              description: 'Add items to your list. Click "Add item" to add more.',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
});
