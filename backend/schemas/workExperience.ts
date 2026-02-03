import { defineType, defineField } from 'sanity'

// ============================================
// WORK EXPERIENCE
// ============================================
// Your professional work history.
// Add each job as a separate entry.
//
// HOW TO EDIT:
// 1. Go to "Work Experience" in the sidebar
// 2. Click "+ Create" to add a new job
// 3. Fill in the details
// ============================================

export default defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  
  fields: [
    // ----------------------------------------
    // JOB DETAILS
    // ----------------------------------------
    
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      description: 'The name of the company',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'role',
      title: 'Your Role/Title',
      type: 'string',
      description: 'Your job title (e.g., "Senior Designer")',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      description: 'When you worked there (e.g., "Jan 2024 - Present")',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Brief summary of what you did (1 sentence)',
    }),

    // ----------------------------------------
    // RESUME / DOCUMENTS
    // ----------------------------------------

    defineField({
      name: 'resume',
      title: 'Resume/CV (PDF)',
      type: 'file',
      description: 'Upload your resume or CV as a PDF file',
      options: {
        accept: '.pdf',
      },
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
      title: 'company',
      subtitle: 'role',
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
