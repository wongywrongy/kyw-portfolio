import { defineType, defineField } from 'sanity'

// ============================================
// HERO SECTION
// ============================================
// The main landing section visitors see first.
// Includes your intro and contact links.
//
// HOW TO EDIT:
// 1. Go to "Hero Section" in the sidebar
// 2. Update your name, tagline, and contact links
// ============================================

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  
  fields: [
    // ----------------------------------------
    // YOUR NAME & INTRO
    // ----------------------------------------
    
    defineField({
      name: 'greeting',
      title: 'Greeting Text',
      type: 'string',
      description: 'The greeting before your name (e.g., "Hey, I\'m")',
      initialValue: "Hey, I'm",
    }),
    
    defineField({
      name: 'name',
      title: 'Your Name',
      type: 'string',
      description: 'Your full name or how you want to be called',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      description: 'A short description of who you are and what you do',
      validation: (Rule) => Rule.required(),
    }),
    
    // ----------------------------------------
    // CONTACT LINKS
    // ----------------------------------------
    
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Your contact email',
    }),
    
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Link to your LinkedIn profile',
    }),
    
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to your GitHub profile',
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title: 'Hero Section',
        subtitle: title || 'Add your name',
      }
    },
  },
})
