import { defineType, defineField } from 'sanity'

// ============================================
// PROJECTS
// ============================================
// Showcase your portfolio projects here.
//
// HOW TO EDIT:
// 1. Go to "Projects" in the sidebar
// 2. Click "+ Create" to add a new project
// 3. Fill in the title, subtitle, and description
// ============================================

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  
  fields: [
    // ----------------------------------------
    // BASIC INFO
    // ----------------------------------------
    
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The name of your project',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Type',
      type: 'string',
      description: 'What kind of project (e.g., "Web Application", "Mobile App")',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Brief explanation of the project (1 sentence)',
    }),
    
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'URL to the project (e.g., https://example.com or GitHub repo)',
    }),
    
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Add keywords like "React", "Design", "TypeScript" (press Enter after each tag)',
      of: [
        {
          type: 'string',
          validation: (Rule) => Rule.required(),
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
      subtitle: 'subtitle',
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
