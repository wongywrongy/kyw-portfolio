# CMS Customization Guide

This guide explains what content you can customize through Sanity CMS.

## 📝 Content Types Available

### 1. **Home Page** (`home`)
Customize the main landing page:
- **Hero Section**: Your name and tagline/description
- **About Preview**: Title and multiple paragraphs (shorter version of full about page)
- **Blog Section**: Title and subtitle for the blog section
- **Contact Section**: 
  - Section title and subtitle
  - Contact methods (Email, LinkedIn, GitHub, etc.)
  - Each contact includes: label, value, URL, and description

### 2. **About Page** (`about`)
Full about page content:
- **Page Title**: Main heading for the about page
- **Sections**: Add multiple sections with:
  - Section title (e.g., "Introduction", "Education", "Experience")
  - Section content (full text, supports multiple paragraphs)

### 3. **Blog Posts** (`blogPost`)
Create and manage blog articles:
- **Post Details**: Title, slug (URL), excerpt, date, read time
- **Featured Image**: Optional image at the top of the post
- **Rich Content**: Add various content blocks:
  - **Text Blocks**: Regular paragraphs
  - **Headings**: H1, H2, H3 headings
  - **Images**: Upload images with alt text, captions, width, and alignment
  - **Code Blocks**: Syntax-highlighted code with language selection
  - **LaTeX**: Mathematical equations (inline or block)
  - **Lists**: Ordered or unordered lists

### 4. **Resume** (`resume`)
Customize the resume page:
- **Page Title**: Main title for the resume page
- **Introduction Text**: Optional text that appears above the PDF
- **PDF File**: Upload your resume as a PDF
- **Download Button Text**: Customize the download button text
- **Last Updated Date**: Track when you last updated your resume
- **Show Last Updated**: Toggle to show/hide the last updated date

### 5. **Site Settings** (`siteSettings`)
Global site-wide settings:
- **Site Name**: Your website's name
- **Site Description**: Brief description for SEO
- **Social Media Links**: Add multiple social profiles:
  - Platform name (GitHub, LinkedIn, Twitter, etc.)
  - Profile URL
  - Optional icon identifier
- **Footer Text**:
  - Copyright text (supports {year} placeholder)
  - Additional footer text
- **Navigation Links**: Customize menu items:
  - Link label (text shown)
  - Link path (URL)
  - Display order

## 🎨 What You Can Customize

### ✅ Fully Customizable:
- ✅ All text content (titles, descriptions, paragraphs)
- ✅ Contact information (email, social links)
- ✅ Resume PDF upload and metadata
- ✅ Blog post content with images
- ✅ Site-wide links and social media
- ✅ Footer text and copyright
- ✅ Navigation menu items

### 📸 Image Support:
- Blog post featured images
- Images throughout blog post content
- All images support:
  - Alt text (for accessibility)
  - Captions
  - Custom width
  - Alignment (left, center, right)

### 🔗 Link Management:
- Contact method links (home page)
- Social media links (site settings)
- Navigation menu links (site settings)
- All links are fully editable

## 📋 Quick Reference

### To Edit Home Page:
1. Open Sanity Studio
2. Click "Home Page"
3. Edit hero name/description
4. Edit about preview paragraphs
5. Edit blog section title/subtitle
6. Add/edit contact methods

### To Edit About Page:
1. Click "About Page"
2. Edit page title
3. Add/edit sections (each with title and content)

### To Create Blog Post:
1. Click "Blog Post" → "Create new"
2. Add title, slug, excerpt, date
3. Upload featured image (optional)
4. Add content blocks (text, headings, images, code, etc.)

### To Update Resume:
1. Click "Resume"
2. Edit title and intro text
3. Upload new PDF file
4. Customize download button text
5. Update last updated date

### To Edit Site Settings:
1. Click "Site Settings"
2. Edit site name and description
3. Add/edit social media links
4. Customize footer text
5. Configure navigation links

## 💡 Tips

- **Contact Info**: Edit in "Home Page" → "Contact Section"
- **Social Links**: Edit in "Site Settings" → "Social Media Links"
- **Footer Text**: Edit in "Site Settings" → "Footer Text"
- **Navigation**: Edit in "Site Settings" → "Navigation Links"
- **All Text**: Every text field is editable with helpful descriptions

## 🚀 Getting Started

1. Open Sanity Studio at http://localhost:3333
2. Create documents for each content type:
   - Start with "Home Page" (required)
   - Then "About Page"
   - Add "Site Settings" for global customization
   - Create "Blog Post" documents
   - Add "Resume" document
3. Fill in all the fields with your content
4. Upload images and PDFs as needed
5. Save and publish your changes

All content is now managed through Sanity CMS - no code changes needed!
