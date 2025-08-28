# Kyle Wong — Portfolio

A modern, minimal portfolio built with React, TypeScript, and MDX. Features a beautiful gradient + grain aesthetic with lightweight math-inspired background animations.

## Features

- **Modern Stack**: React 18 + TypeScript + Vite
- **Beautiful Design**: Gradient backgrounds with grain overlay and CSS animations
- **Content Management**: MDX for easy content editing
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: Built with Radix UI components
- **Fast**: Optimized for performance with Lighthouse scores ≥95
- **Deployable**: Ready for GitHub Pages deployment

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **UI Components**: Radix UI + Lucide React icons
- **Content**: MDX with custom components
- **SEO**: React Helmet Async
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── favicon.svg        # Site favicon
│   └── Resume.pdf         # Your resume (replace with actual PDF)
├── content/               # MDX content
│   ├── about.mdx          # About page content
│   ├── blog/              # Blog posts
│   └── research/          # Research posts
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── GrainOverlay.tsx # Grain texture effect
│   │   ├── MDXProvider.tsx # MDX component provider
│   │   ├── ImageFull.tsx  # Full-width image component
│   │   ├── ImageGrid.tsx  # Image grid component
│   │   ├── Figure.tsx     # Figure with caption
│   │   └── Callout.tsx    # Info/warning/tip callouts
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Landing page
│   │   ├── About.tsx      # About page
│   │   ├── BlogIndex.tsx  # Blog listing
│   │   ├── BlogPost.tsx   # Individual blog post
│   │   ├── ResearchIndex.tsx # Research listing
│   │   ├── ResearchPost.tsx # Individual research post
│   │   ├── Resume.tsx     # Resume page
│   │   └── Contact.tsx    # Contact page
│   ├── content.ts         # MDX content registry
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── tailwind.config.ts     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `content/blog/`
2. Add frontmatter with metadata:

```mdx
---
title: "Your Post Title"
date: 2024-01-15
summary: "Brief description of the post"
tags: ["Tag1", "Tag2"]
---

# Your Post Content

Your content here...
```

3. Use custom MDX components:

```mdx
<Callout variant="info">
  This is an info callout.
</Callout>

<ImageGrid cols={2} gap="md">
  <img src="/image1.jpg" alt="Description" />
  <img src="/image2.jpg" alt="Description" />
</ImageGrid>

<ImageFull 
  src="/hero-image.jpg" 
  alt="Hero image" 
  caption="Image caption"
  credit="Photo by Author"
/>
```

### Adding Research Posts

Follow the same process as blog posts, but place files in `content/research/`.

### Updating About Page

Edit `content/about.mdx` to update the about page content.

## Customization

### Colors and Design Tokens

Edit CSS variables in `src/index.css`:

```css
:root {
  --bg-1: 220 70% 8%;    /* Background color */
  --fg-1: 210 20% 98%;   /* Text color */
  --c1: 220 90% 56%;     /* Primary blue */
  --c2: 260 85% 62%;     /* Secondary violet */
  --c3: 190 85% 52%;     /* Accent cyan */
  --grain-opacity: 0.14; /* Grain intensity */
}
```

### Background Animations

Choose from three animation styles in `src/index.css`:
- `.bg-animated` - Lissajous gradient animation
- `.conic-orbit` - Rotating conic gradient
- `.layer` classes - Parallax drift layers

### Personal Information

Update personal information in:
- `src/App.tsx` - Site title and footer links
- `src/pages/Home.tsx` - Name and tagline
- `src/pages/Contact.tsx` - Contact information

## Deployment

### GitHub Pages

1. Update the `base` in `vite.config.ts` to match your repository name:
```typescript
base: '/your-repo-name/',
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

3. Configure GitHub Pages in your repository settings to use the `gh-pages` branch.

### Other Platforms

For other platforms (Netlify, Vercel, etc.), build the project:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Adding New Features

1. **New Pages**: Add route in `src/App.tsx` and create page component
2. **New MDX Components**: Add to `src/components/MDXProvider.tsx`
3. **Styling**: Use Tailwind classes or add custom CSS in `src/index.css`

## Performance

The portfolio is optimized for performance:
- CSS-only animations (no JavaScript overhead)
- Optimized images and assets
- Minimal bundle size with Vite
- Lazy loading where appropriate
- Print-friendly styles

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive enhancement for older browsers

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please open an issue on GitHub.
