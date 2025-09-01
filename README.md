# Kyle Wong — Portfolio

Personal portfolio built with React, TypeScript, and Vite. Features a minimal design with gradient backgrounds and WebGL animations.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Background**: OGL (WebGL library)
- **Content**: TypeScript files for structured content
- **Deployment**: GitHub Pages

## Setup

### Requirements
- Node.js 18+
- npm or yarn

### Install & Run
```bash
git clone <repo-url>
cd portfolio
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
portfolio/
├── public/
│   └── assets/
│       └── Resume.pdf
├── src/
│   ├── components/
│   │   ├── PrismBackground.tsx    # WebGL background
│   │   ├── FloatingMenu.tsx       # Navigation menu
│   │   └── GrainOverlay.tsx       # Grain texture
│   ├── pages/
│   │   ├── Home.tsx               # Landing page
│   │   ├── About.tsx              # About page
│   │   ├── BlogIndex.tsx          # Blog listing
│   │   ├── BlogPost.tsx           # Individual post
│   │   ├── Resume.tsx             # Resume page
│   │   ├── Contact.tsx            # Contact page
│   │   └── Menu.tsx               # Menu page
│   ├── content/
│   │   ├── about.ts               # About content
│   │   └── blog/
│   │       ├── index.ts           # Blog content registry
│   │       └── posts/
│   │           ├── research/      # Research posts
│   │           ├── blog/          # Blog posts
│   │           └── projects/      # Project posts
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Light/dark theme
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Content Management

### Blog Posts

Each post is a TypeScript file in `src/content/blog/posts/[category]/`:

```typescript
export const post = {
  id: 1,
  title: "Post Title",
  excerpt: "Brief description",
  category: "research", // or "blog", "projects"
  date: "2024-01-15",
  readTime: "5 min read",
  content: `
# Your Content

Markdown content here.
  `,
  images: [
    {
      src: "https://example.com/image.jpg",
      alt: "Description",
      caption: "Optional caption"
    }
  ]
}
```

### Adding New Posts

1. Create file in appropriate category folder
2. Import in `src/content/blog/index.ts`
3. Add to `allPosts` array

### About Page

Edit `src/content/about.ts`:

```typescript
export const aboutContent = {
  title: "About Me",
  sections: [
    {
      title: "Section Title",
      content: "Section content..."
    }
  ]
}
```

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --bg-1: 220 70% 8%;    /* Background */
  --fg-1: 210 20% 98%;   /* Text */
  --c1: 220 90% 56%;     /* Primary */
  --c2: 260 85% 62%;     /* Secondary */
  --c3: 190 85% 52%;     /* Accent */
}
```

### Background Animation

Configure in `src/components/PrismBackground.tsx`:

```typescript
const config = {
  glow: 1.518,           // Background glow
  noise: 0.03,           // Noise level
  targetFPS: 24,         // Performance
  // ... other settings
}
```

### Personal Info

Update in:
- `src/App.tsx` - Site title, footer links
- `src/pages/Home.tsx` - Name, subtitle
- `src/pages/Contact.tsx` - Contact details

## Deployment

### GitHub Pages

1. Update `base` in `vite.config.ts`:
```typescript
base: '/your-repo-name/',
```

2. Deploy:
```bash
npm run deploy
```

3. Set GitHub Pages to use `gh-pages` branch

### Other Platforms

Build for production:
```bash
npm run build
```

Files output to `dist/`

## Development

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run deploy` - Deploy to GitHub Pages

### Adding Features

- **New Pages**: Add route in `App.tsx`, create page component
- **New Content**: Add to appropriate content folder
- **Styling**: Use Tailwind classes or add to `index.css`

## Performance

- WebGL background optimized for 24 FPS
- Lazy loading for images
- Minimal bundle size with Vite
- CSS-only animations where possible

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive enhancement

## License

MIT License
