# Content Management Guide

Complete guide for editing all content on your portfolio without touching component code.

## 📁 Content Structure

All content is in `src/infrastructure/data/`:

```
src/infrastructure/data/
├── home.ts          # Home page content
├── contact.ts       # Contact page content
├── about.ts         # About page content
└── blog/            # Blog posts
    ├── index.ts
    └── posts/
        ├── research/
        ├── projects/
        └── blog/
```

## 🏠 Home Page

Edit `src/infrastructure/data/home.ts`:

- **Hero**: Name and description
- **About**: Title and paragraphs
- **Blog**: Title and subtitle
- **Contact**: Title, subtitle, and contact info

## 📧 Contact Page

Edit `src/infrastructure/data/contact.ts`:

- Page title and subtitle
- Contact information (Email, LinkedIn, GitHub)
- Response time message

Icons auto-map: "Email" → Mail, "LinkedIn" → LinkedIn, "GitHub" → GitHub

## 📝 About Page

Edit `src/infrastructure/data/about.ts`:

- Page title
- Section titles and content
- Add/remove sections
- Add images to sections

### Adding Images

1. Place images in `public/assets/images/`
2. Add to section:

```typescript
{
  title: "Section Title",
  content: "Your content...",
  images: [
    {
      src: "/assets/images/photo.jpg",
      alt: "Description",
      caption: "Optional caption",
      width: 1200,  // Optional
      height: 600   // Optional
    }
  ]
}
```

## 📚 Blog Posts

Create posts in `src/infrastructure/data/blog/posts/[category]/`:

1. Create new file: `post-2.ts`
2. Export post object with required fields
3. Import in `blog/index.ts`
4. Add to `allPosts` array

### Post Structure

```typescript
export const post = {
  id: 2,
  title: "Post Title",
  slug: "post-slug",
  excerpt: "Brief description...",
  category: "research", // or "projects", "blog"
  date: "2024-01-15",
  content: [
    { type: "heading", level: 1, content: "Title" },
    { type: "text", content: "Paragraph..." },
    { type: "image", src: "/path/to/image.jpg", alt: "Description" },
    { type: "code", language: "typescript", code: "..." },
    { type: "list", items: ["Item 1", "Item 2"] }
  ]
}
```

### Content Types

- `heading`: `{ type: "heading", level: 1-6, content: "..." }`
- `text`: `{ type: "text", content: "..." }`
- `image`: `{ type: "image", src: "...", alt: "...", caption?: "..." }`
- `code`: `{ type: "code", language: "...", code: "..." }`
- `list`: `{ type: "list", items: ["..."] }`
- `latex`: `{ type: "latex", content: "..." }`

## 🎨 Styling

**Do NOT edit component files** for content changes.

Only edit:
- ✅ Content data files (`src/infrastructure/data/*.ts`)
- ✅ Constants (`src/shared/constants/index.ts`) for site-wide settings

## 💡 Tips

- Keep paragraphs concise
- Use proper formatting
- Test changes after editing
- Backup important content
