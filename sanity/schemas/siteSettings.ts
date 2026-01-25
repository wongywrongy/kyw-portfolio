/**
 * Site Settings Schema
 * 
 * This schema defines site-wide settings including links, social media,
 * footer information, and other customizable text throughout the site.
 */

import { defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Global site settings including social media links, footer information, and other site-wide text. Edit these settings to customize links and text throughout your portfolio.',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of your website (e.g., "Kyle Wong Portfolio" or "My Portfolio").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description: 'A brief description of your website for SEO and social sharing.',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      description: 'Add your social media profiles and links. These will appear in the footer and can be used throughout the site.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              description: 'The name of the platform (e.g., "GitHub", "LinkedIn", "Twitter", "Instagram").',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Profile URL',
              type: 'string',
              description: 'The full URL to your profile (e.g., "https://github.com/username" or "mailto:email@example.com").',
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (!value) return 'URL is required';
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
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Optional: Icon identifier (will use platform name if not specified).',
            },
          ],
        },
      ],
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'object',
      description: 'Customize the footer text and information.',
      fields: [
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
          description: 'Copyright text (e.g., "© 2024 Kyle Wong" or "© 2024 All rights reserved").',
          initialValue: '© {year}',
        },
        {
          name: 'additionalText',
          title: 'Additional Footer Text',
          type: 'text',
          description: 'Optional additional text to display in the footer.',
        },
      ],
    },
    {
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Customize the navigation menu links. Add or remove menu items here.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              description: 'The text that appears in the menu (e.g., "Home", "About", "Blog").',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'path',
              title: 'Link Path',
              type: 'string',
              description: 'The URL path (e.g., "/", "/about", "/blog").',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'The order in which this link appears in the menu (lower numbers appear first).',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
});
