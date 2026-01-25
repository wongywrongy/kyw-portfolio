/**
 * Resume Schema
 * 
 * This schema defines the structure for the resume page.
 * Upload a PDF file that will be displayed on the resume page.
 */

import { defineType } from 'sanity';

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  description: 'Customize your resume page. Upload a PDF file and add custom text, descriptions, and download options.',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title for the resume page (e.g., "Resume" or "My Resume").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      description: 'Optional text that appears above the resume PDF (e.g., "Download my resume to learn more about my experience and skills.").',
    },
    {
      name: 'pdfFile',
      title: 'Resume PDF',
      type: 'file',
      description: 'Upload your resume as a PDF file. Make sure the file is clear and up-to-date. The PDF will be displayed directly on the resume page.',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required().error('Please upload a PDF file for your resume.'),
    },
    {
      name: 'downloadText',
      title: 'Download Button Text',
      type: 'string',
      description: 'Text for the download button (e.g., "Download Resume" or "Download PDF").',
      initialValue: 'Download Resume',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'The date when you last updated your resume. This helps visitors know how current your resume is.',
    },
    {
      name: 'showLastUpdated',
      title: 'Show Last Updated Date',
      type: 'boolean',
      description: 'Check this to display the last updated date on the resume page.',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle: subtitle ? `Last updated: ${new Date(subtitle).toLocaleDateString()}` : 'No update date',
      };
    },
  },
});
