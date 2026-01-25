/**
 * Home Page Schema
 * 
 * This schema defines the structure for the home page content.
 * Each section is clearly labeled and includes helpful descriptions.
 */

import { defineType } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  description: 'Main landing page content. Edit the hero section, about preview, blog section, and contact information here.',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      description: 'The main hero section at the top of the homepage with your name and tagline.',
      fields: [
        {
          name: 'name',
          title: 'Your Name',
          type: 'string',
          description: 'Your full name displayed prominently on the homepage.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Hero Description',
          type: 'string',
          description: 'A short tagline or description that appears below your name (e.g., "Computer Science @ SJSU").',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'about',
      title: 'About Section Preview',
      type: 'object',
      description: 'The about section preview that appears on the homepage. This is a shorter version of your full about page.',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'The title for the about section (e.g., "About me").',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'paragraphs',
          title: 'About Paragraphs',
          type: 'array',
          description: 'Add multiple paragraphs to describe yourself. Each paragraph will appear as a separate block of text.',
          of: [{ type: 'text' }],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: 'blog',
      title: 'Blog Section',
      type: 'object',
      description: 'The blog section that appears on the homepage.',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'The title for the blog section (e.g., "Blog").',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          description: 'A brief description of what visitors will find in your blog (e.g., "Explore my research, projects, and thoughts").',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      description: 'Contact information displayed on the homepage. Add your email, LinkedIn, GitHub, and other contact methods.',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'The title for the contact section (e.g., "Get in Touch").',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string',
          description: 'A friendly message encouraging visitors to reach out.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'contacts',
          title: 'Contact Methods',
          type: 'array',
          description: 'Add your contact methods (Email, LinkedIn, GitHub, etc.). Each contact will appear as a card on the homepage.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Contact Label',
                  type: 'string',
                  description: 'The name of the contact method (e.g., "Email", "LinkedIn", "GitHub").',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'value',
                  title: 'Contact Value',
                  type: 'string',
                  description: 'The actual contact information or username (e.g., "kyle.t.wong@sjsu.edu" or "github.com/wongywrongy").',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  description: 'The full URL for this contact method (e.g., "mailto:kyle.t.wong@sjsu.edu" or "https://github.com/wongywrongy").',
                  validation: (Rule) =>
                    Rule.required().custom((value) => {
                      if (!value) return true;
                      // Allow mailto: links
                      if (value.startsWith('mailto:')) return true;
                      // Allow http:// and https:// URLs
                      if (value.startsWith('http://') || value.startsWith('https://')) return true;
                      // Allow tel: links
                      if (value.startsWith('tel:')) return true;
                      return 'Must be a valid URL (http://, https://), mailto: link, or tel: link';
                    }),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  description: 'A short description of what this contact method is for (e.g., "Send me an email").',
                },
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'hero.name',
    },
  },
});
