import { defineType, defineField } from 'sanity'

// ============================================
// SITE SETTINGS
// ============================================
// Global configuration for your entire website.
// This includes metadata, SEO information, and branding.
//
// HOW TO EDIT:
// 1. Go to "Site Settings" in the sidebar
// 2. Fill in your site title and description
// 3. These values will appear in browser tabs and search results
// ============================================

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  
  // Makes this a singleton (only one can exist)
  // You'll only need to set this up once
  
  fields: [
    // ----------------------------------------
    // BASIC INFORMATION
    // ----------------------------------------
    
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The name of your website (appears in browser tab)',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'A brief description of your site (used by search engines like Google)',
      validation: (Rule) => Rule.required().max(160),
    }),
    
    // ----------------------------------------
    // BRANDING
    // ----------------------------------------
    
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Your site logo (optional)',
      options: {
        hotspot: true,
      },
    }),
    
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon that appears in browser tabs (recommended: 32x32 pixels)',
    }),
    
    // ----------------------------------------
    // SEO & SOCIAL SHARING
    // ----------------------------------------
    
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when your site is shared on social media (recommended: 1200x630 pixels)',
    }),

    // ----------------------------------------
    // DOWNLOADABLE DOCUMENTS
    // ----------------------------------------

    defineField({
      name: 'resume',
      title: 'Global Resume/CV',
      type: 'file',
      description: 'Your main resume/CV that can be downloaded from the site',
      options: {
        accept: '.pdf',
      },
    }),

    defineField({
      name: 'documents',
      title: 'Other Documents',
      type: 'array',
      description: 'Additional downloadable documents (policies, certifications, etc.)',
      of: [
        {
          type: 'file',
          title: 'Document',
          options: {
            accept: '.pdf,.doc,.docx',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Document Title',
              description: 'Display name for this document',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global website configuration',
      }
    },
  },
})
