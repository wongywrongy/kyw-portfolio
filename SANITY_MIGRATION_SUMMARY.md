# Sanity CMS Migration Summary

## What Has Been Set Up

### ✅ Completed

1. **Sanity Packages Installed**
   - `@sanity/client` - For fetching data
   - `@sanity/image-url` - For image URL generation

2. **Sanity Schemas Created** (`sanity/schemas/`)
   - **home.ts** - Home page content (hero, about preview, blog, contact)
   - **about.ts** - About page with multiple sections
   - **blogPost.ts** - Blog posts with rich content support:
     - Text blocks
     - Headings (H1, H2, H3)
     - Images with alt text, captions, width, alignment
     - Code blocks with syntax highlighting
     - LaTeX math equations
     - Lists (ordered and unordered)
   - **resume.ts** - Resume with PDF upload

3. **CMS Client Setup** (`src/infrastructure/cms/`)
   - `client.ts` - Sanity client configuration
   - `queries.ts` - GROQ queries for all content types
   - `hooks.ts` - React hooks for fetching content:
     - `useHomeContent()` - Home page content
     - `useAboutContent()` - About page content
     - `useBlogPosts()` - All blog posts
     - `useBlogPost(slug)` - Single blog post
     - `useResume()` - Resume PDF

4. **Documentation**
   - `SANITY_SETUP.md` - Complete setup guide
   - `.env.example` - Environment variable template

## Schema Features

### Home Page Schema
- **Hero Section**: Name and description
- **About Preview**: Title and multiple paragraphs
- **Blog Section**: Title and subtitle
- **Contact Section**: Title, subtitle, and array of contact methods

### About Page Schema
- Page title
- Multiple sections, each with:
  - Section title
  - Section content (text)

### Blog Post Schema
- Title, slug, excerpt, date, read time
- Featured image (optional)
- Rich content blocks:
  - **Text**: Regular paragraphs
  - **Headings**: H1, H2, H3 with level selection
  - **Images**: Upload with alt text, caption, width, alignment
  - **Code**: Syntax-highlighted code blocks with language selection
  - **LaTeX**: Mathematical equations (inline or block)
  - **Lists**: Ordered or unordered lists

### Resume Schema
- Title
- PDF file upload
- Download button text
- Last updated date

## Next Steps

### 1. Set Up Sanity Project
Follow `SANITY_SETUP.md` to:
- Create a Sanity project
- Get your Project ID
- Set up environment variables

### 2. Update Components
Replace static data imports with hooks:

**Home.tsx:**
```typescript
// Old:
import { homeContent } from '../../infrastructure/data/home';

// New:
import { useHomeContent } from '../../infrastructure/cms/hooks';
const { content, loading, error } = useHomeContent();
```

**About.tsx:**
```typescript
// Old:
import { aboutContent } from '../../infrastructure/data/about';

// New:
import { useAboutContent } from '../../infrastructure/cms/hooks';
const { content, loading, error } = useAboutContent();
```

**BlogIndex.tsx:**
```typescript
// Old:
import { allPosts } from '../../infrastructure/data/blog';

// New:
import { useBlogPosts } from '../../infrastructure/cms/hooks';
const { posts, loading, error } = useBlogPosts();
```

**BlogPost.tsx:**
```typescript
// Old:
import { getPostBySlug } from '../../infrastructure/data/blog';

// New:
import { useBlogPost } from '../../infrastructure/cms/hooks';
const { post, loading, error } = useBlogPost(slug);
```

**Resume.tsx:**
```typescript
// New:
import { useResume } from '../../infrastructure/cms/hooks';
const { resume, loading, error } = useResume();
```

### 3. Handle Loading & Error States
Add loading spinners and error messages in components:
```typescript
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
if (!content) return <div>No content found</div>;
```

### 4. Migrate Existing Content
1. Open Sanity Studio
2. Create documents for each content type
3. Copy content from existing files:
   - `src/infrastructure/data/home.ts` → Home document
   - `src/infrastructure/data/about.ts` → About document
   - Blog markdown files → Blog Post documents
   - Upload resume PDF → Resume document

## Schema Design Principles

All schemas follow these principles:

1. **Clear Labels**: Every field has a descriptive title
2. **Helpful Descriptions**: Each field includes instructions
3. **Validation**: Required fields are marked
4. **User-Friendly**: Non-technical users can easily edit content
5. **Flexible**: Supports various content types (text, images, code, etc.)

## Content Management Tips

### For Content Editors:

- **Home Page**: Edit hero name/description, about paragraphs, contact info
- **About Page**: Add/edit sections with titles and content
- **Blog Posts**: 
  - Add content blocks by clicking "Add item"
  - Upload images directly in the CMS
  - Use code blocks for code snippets
  - Use LaTeX for math equations
- **Resume**: Simply upload a new PDF to update

### Image Management:
- Upload images directly in Sanity
- Always provide alt text for accessibility
- Optional captions for context
- Control width and alignment

### Code Blocks:
- Select programming language for syntax highlighting
- Paste code as-is
- Great for tutorials and technical posts

## File Structure

```
kyw-portfolio/
├── sanity/
│   ├── schemas/
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── blogPost.ts
│   │   ├── resume.ts
│   │   └── index.ts
│   └── config.ts
├── src/
│   └── infrastructure/
│       └── cms/
│           ├── client.ts
│           ├── queries.ts
│           └── hooks.ts
├── .env.example
├── SANITY_SETUP.md
└── SANITY_MIGRATION_SUMMARY.md
```

## Environment Variables Needed

Create a `.env` file with:
```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your-token (optional, for production)
```

## Support

- Sanity Docs: https://www.sanity.io/docs
- Sanity Community: https://slack.sanity.io
- Setup Guide: See `SANITY_SETUP.md`
