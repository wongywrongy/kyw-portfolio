/**
 * About Page Schema
 * 
 * This schema defines the structure for the about page content.
 * Add multiple sections to tell your story in an organized way.
 */

import { defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  description: 'Full about page content. Add multiple sections to tell your story, background, and interests.',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title for the about page (e.g., "About Me").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'About Sections',
      type: 'array',
      description: 'Add multiple sections to organize your about page content. Each section has a title and content. Examples: Introduction, Education, Experience, Interests, etc.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'The title of this section (e.g., "Introduction", "Academic Background", "Personal Interests").',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'text',
              description: 'The main content for this section. Write as much as you want - this supports multiple paragraphs.',
              validation: (Rule) => Rule.required(),
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
    },
  },
});
