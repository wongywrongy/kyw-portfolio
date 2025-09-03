# Blog Features Documentation

## Overview

The enhanced blog system now supports LaTeX rendering, interactive images with captions, and improved code blocks. All components are modular and can be easily customized.

## LaTeX Support

### Inline LaTeX
Use `\\(...\\)` for inline mathematical expressions:

```markdown
The derivative of \\(f(x) = x^2\\) is \\(f'(x) = 2x\\).
```

### Block LaTeX
Use `\\[...\\]` for displayed equations:

```markdown
The quadratic formula is:

\\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]
```

### Common Macros
The following macros are predefined:
- `\\RR` → `\\mathbb{R}` (Real numbers)
- `\\NN` → `\\mathbb{N}` (Natural numbers)
- `\\ZZ` → `\\mathbb{Z}` (Integers)
- `\\QQ` → `\\mathbb{Q}` (Rational numbers)
- `\\CC` → `\\mathbb{C}` (Complex numbers)

## Enhanced Images

### Basic Usage
```markdown
<BlogImage
  src="/path/to/image.jpg"
  alt="Description"
  caption="Optional caption"
  width={800}
  height={400}
/>
```

### Features
- **Lightbox**: Click to view full-size image
- **Download**: Download button for images
- **Hover Effects**: Smooth animations and overlays
- **Responsive**: Automatically adapts to screen size
- **Captions**: Optional descriptive text below images

### Props
- `src`: Image source URL
- `alt`: Alt text for accessibility
- `caption`: Optional caption text
- `width`: Image width (optional)
- `height`: Image height (optional)
- `lightbox`: Enable/disable lightbox (default: true)
- `downloadable`: Enable/disable download (default: true)
- `className`: Additional CSS classes

## Code Blocks

### Basic Usage
```markdown
<CodeBlock language="python" filename="gradient_descent.py">
def gradient_descent(X, y, learning_rate=0.01):
    # Your code here
    pass
</CodeBlock>
```

### Features
- **Syntax Highlighting**: Automatic language detection
- **Copy to Clipboard**: One-click code copying
- **Download**: Download code as file
- **Filename Display**: Show filename in header
- **Language Badge**: Visual language indicator

### Props
- `children`: Code content
- `language`: Programming language (default: "text")
- `filename`: Optional filename to display
- `className`: Additional CSS classes

## Component Architecture

### File Structure
```
src/components/mdx/
├── BlogImage.tsx      # Enhanced image component
├── LaTeX.tsx          # LaTeX rendering component
├── CodeBlock.tsx      # Code block component
└── MDXProvider.tsx    # Main MDX component registry
```

### Integration
All components are automatically available in MDX content through the `MDXProvider`. No additional imports needed in blog posts.

## Example Blog Post

```typescript
export const post = {
  id: 1,
  title: "Mathematical Foundations",
  content: `
# Title

Here's some inline math: \\(E = mc^2\\)

And a block equation:

\\[\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\]

<BlogImage
  src="/math-image.jpg"
  alt="Mathematical diagram"
  caption="Visual representation of the concept"
/>

<CodeBlock language="python" filename="example.py">
import numpy as np
# Your code here
</CodeBlock>
  `,
  images: [...]
}
```

## Customization

### Styling
All components use Tailwind CSS classes and can be customized by:
1. Modifying the component's className prop
2. Updating the component's default styles
3. Adding custom CSS in the global stylesheet

### Theme Support
Components automatically adapt to light/dark themes using the `useTheme` hook.

### Adding New Components
1. Create the component in `src/components/mdx/`
2. Import it in `MDXProvider.tsx`
3. Add it to the components object
4. The component is now available in all MDX content

## Performance Considerations

- **LaTeX**: Renders on-demand using KaTeX
- **Images**: Lazy loading for better performance
- **Code**: Syntax highlighting applied only when needed
- **Animations**: Framer Motion optimizations for smooth interactions

## Browser Support

- **LaTeX**: Requires KaTeX (automatically loaded)
- **Images**: Standard HTML5 image support
- **Code**: Syntax highlighting works in all modern browsers
- **Animations**: Framer Motion with fallbacks for older browsers
