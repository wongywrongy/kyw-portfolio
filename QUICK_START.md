# Quick Start Guide - Sanity CMS Setup

## ✅ What's Already Done

1. ✅ Sanity packages installed
2. ✅ Schemas created for all content types
3. ✅ Studio folder created and configured
4. ✅ Environment variables set up (`.env` file)
5. ✅ Project ID configured: `29s0hb29`

## 🚀 Next Steps

### 1. Start the Sanity Studio

The studio is already running in the background! Open your browser and go to:

**http://localhost:3333**

If it's not running, start it manually:
```bash
cd studio
npm run dev
```

### 2. Create Your Content

Once the studio is open, you'll see your content types:

#### **Home Page** (Create first!)
- Click "Home Page" → "Create new"
- Fill in:
  - **Hero Section**: Your name and description
  - **About Section**: Title and paragraphs
  - **Blog Section**: Title and subtitle
  - **Contact Section**: Add your contact methods (Email, LinkedIn, GitHub)

#### **About Page**
- Click "About Page" → "Create new"
- Add multiple sections with titles and content

#### **Blog Posts**
- Click "Blog Post" → "Create new"
- Add title, slug, excerpt, date
- Upload featured image (optional)
- Add content blocks:
  - Click "Add item" to add text, headings, images, code blocks, etc.
  - Upload images directly in the CMS
  - Add code blocks with syntax highlighting
  - Use LaTeX for math equations

#### **Resume**
- Click "Resume" → "Create new"
- Upload your PDF file
- Add title and download button text

### 3. Update Your React Components

After creating content in Sanity, update your components to use the hooks:

**Example for Home.tsx:**
```typescript
// Replace this:
import { homeContent } from '../../infrastructure/data/home';

// With this:
import { useHomeContent } from '../../infrastructure/cms/hooks';

// In your component:
const { content, loading, error } = useHomeContent();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
if (!content) return <div>No content found</div>;

// Use content.hero.name, content.about.title, etc.
```

### 4. Test Everything

1. Make sure content loads from Sanity
2. Test image uploads
3. Test blog post creation
4. Test resume PDF upload

## 📝 Important Notes

- **Project ID**: `29s0hb29` (already configured)
- **Dataset**: `production` (already configured)
- **Studio URL**: http://localhost:3333
- **Environment file**: `.env` (already created)

## 🆘 Troubleshooting

**Studio won't start?**
- Make sure you're in the `studio` folder
- Run `npm install` in the studio folder
- Check that port 3333 is available

**Content not showing?**
- Check `.env` file has correct Project ID
- Verify content exists in Sanity Studio
- Check browser console for errors

**Images not loading?**
- Make sure images are uploaded to Sanity (not just referenced)
- Check image URLs in browser network tab

## 📚 More Help

- See `SANITY_SETUP.md` for detailed setup instructions
- See `SANITY_MIGRATION_SUMMARY.md` for migration guide
- Sanity Docs: https://www.sanity.io/docs
