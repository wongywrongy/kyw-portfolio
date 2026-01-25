# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your portfolio website.

## Prerequisites

- A Sanity account (sign up at https://www.sanity.io)
- Node.js installed on your computer

## Step 1: Create a Sanity Project

1. Go to https://www.sanity.io/manage
2. Click "Create new project"
3. Give your project a name (e.g., "Portfolio CMS")
4. Choose a dataset name (use "production" for live content)
5. Note your **Project ID** - you'll need this later

## Step 2: Install Sanity Studio (Optional but Recommended)

The Sanity Studio is a visual editor for managing your content. You can run it locally or deploy it.

### Install Sanity CLI (if not already installed):
```bash
npm install -g @sanity/cli
```

### Initialize Sanity Studio in your project:
```bash
cd /Users/kylewong/Documents/Cursor/kyw-portfolio
npx sanity init
```

When prompted:
- Choose "Create new project" or "Use existing project"
- Select your project
- Choose "Blog (schema)" or "Clean project with no predefined schemas"
- Choose where to save the studio (create a `studio` folder)
- The schemas are already created in the `sanity/schemas` folder

### Link the Studio to Your Schemas

The schemas are located in `sanity/schemas/`. You'll need to configure the studio to use them:

1. In your `studio` folder, create or update `sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity'
import { schemaTypes } from '../sanity/schemas'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [],
  schema: {
    types: schemaTypes,
  },
})
```

2. Run the studio:
```bash
cd studio
npm install
npm run dev
```

3. Open http://localhost:3333 in your browser

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Sanity project details:
```
VITE_SANITY_PROJECT_ID=your-actual-project-id
VITE_SANITY_DATASET=production
```

## Step 4: Set Up Content Types in Sanity

The schemas are already created. You need to:

1. **Home Page**: Create a document of type "Home Page" and fill in:
   - Hero section (name and description)
   - About section preview
   - Blog section
   - Contact information

2. **About Page**: Create a document of type "About Page" with:
   - Page title
   - Multiple sections (Introduction, Education, Experience, etc.)

3. **Blog Posts**: Create documents of type "Blog Post" for each post:
   - Title and slug
   - Excerpt
   - Date
   - Featured image (optional)
   - Content blocks (text, headings, images, code, LaTeX, lists)

4. **Resume**: Create a document of type "Resume":
   - Title
   - Upload PDF file
   - Download button text
   - Last updated date

## Step 5: Get API Token (for Production)

For production builds, you may need a read token:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" → "Tokens"
4. Create a new token with "Viewer" permissions
5. Add it to your `.env`:
```
VITE_SANITY_TOKEN=your-token-here
```

## Step 6: Update Your Code

The hooks in `src/infrastructure/cms/hooks.ts` are ready to use. You'll need to:

1. Replace static imports with hooks in your components
2. Handle loading and error states
3. Test that content loads correctly

## Content Management Tips

### For Non-Developers:

- **Home Page**: Edit the hero section to change your name and tagline
- **About Section**: Add or edit paragraphs to update your bio
- **Contact**: Add/remove contact methods (Email, LinkedIn, GitHub)
- **Blog Posts**: 
  - Click "Add item" in the content section to add new blocks
  - Upload images by clicking the image block
  - Add code blocks by selecting "Code Block" type
  - Use LaTeX blocks for mathematical equations
- **Resume**: Simply upload a new PDF to update your resume

### Image Upload Tips:

- Supported formats: JPG, PNG, GIF, WebP
- Recommended size: Under 2MB for faster loading
- Always add alt text for accessibility
- Use captions to provide context

### Code Block Tips:

- Select the programming language for syntax highlighting
- Paste code exactly as you want it to appear
- Use code blocks for terminal commands, code snippets, and configuration files

## Troubleshooting

### Content not loading?
- Check that your `.env` file has the correct Project ID
- Verify your dataset name matches (usually "production")
- Check browser console for errors

### Images not showing?
- Make sure images are uploaded to Sanity (not just referenced)
- Check that the image URL is accessible
- Verify alt text is provided

### Can't find content types?
- Make sure schemas are properly exported in `sanity/schemas/index.ts`
- Restart the Sanity Studio
- Check that your project ID is correct

## Next Steps

1. Set up your Sanity project
2. Add your content using the Sanity Studio
3. Update your React components to use the new hooks
4. Test everything works correctly
5. Deploy your site!

For more help, visit:
- Sanity Documentation: https://www.sanity.io/docs
- Sanity Community: https://slack.sanity.io
