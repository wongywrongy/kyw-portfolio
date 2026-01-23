# Blog Post Creation Guide

This guide will help you create new blog posts for your portfolio. All blog posts are stored in `src/infrastructure/data/blog/posts/` and can be easily created by following this structure.

## Quick Start

1. Create a new file in `src/infrastructure/data/blog/posts/` (e.g., `post-2.ts`)
2. Copy the template below
3. Fill in your content
4. Import and add it to `src/infrastructure/data/blog/index.ts`

## File Structure

All blog posts are TypeScript files that export a `post` object. The structure is:

```typescript
export const post = {
  id: number,              // Unique ID (increment for each post)
  title: string,           // Post title
  slug: string,           // URL-friendly version of title (lowercase, hyphens)
  excerpt: string,        // Brief description (shown in blog list)
  date: string,          // Publication date in YYYY-MM-DD format
  readTime: string,      // Estimated reading time (e.g., "5 min read")
  content: ContentItem[], // Array of content items (see below)
  images?: BlogImage[]    // Optional: Featured images
}
```

## Content Types

Your `content` array can contain different types of items. Here are all available types:

### 1. Text

Simple paragraph text:

```typescript
{
  type: "text",
  content: "Your paragraph text here. This will be rendered as a regular paragraph with proper spacing."
}
```

### 2. Heading

Headings for section titles:

```typescript
{
  type: "heading",
  level: 2,  // 1-4 (1 is largest, 4 is smallest)
  content: "Section Title"
}
```

**Note:** Use level 2 for main sections, level 3 for subsections, level 4 for sub-subsections.

### 3. LaTeX (Mathematical Expressions)

For mathematical formulas and equations:

**Display mode** (centered, on its own line):
```typescript
{
  type: "latex",
  display: true,
  content: "E = mc^2"
}
```

**Inline mode** (within text):
```typescript
{
  type: "latex",
  display: false,
  content: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
}
```

**Common LaTeX examples:**
- Fractions: `\\frac{numerator}{denominator}`
- Square roots: `\\sqrt{x}` or `\\sqrt[n]{x}`
- Superscripts: `x^2`
- Subscripts: `x_1`
- Greek letters: `\\alpha`, `\\beta`, `\\gamma`, `\\pi`, `\\theta`
- Summation: `\\sum_{i=1}^{n}`
- Integrals: `\\int_{a}^{b} f(x) dx`
- Matrices: `\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}`

### 4. Code Blocks

For code examples with syntax highlighting:

```typescript
{
  type: "code",
  language: "python",  // javascript, typescript, python, java, cpp, html, css, etc.
  filename: "example.py",  // Optional: filename to display
  content: `def hello():
    print("Hello, World!")`
}
```

**Supported languages:** `javascript`, `typescript`, `python`, `java`, `cpp`, `c`, `html`, `css`, `json`, `xml`, `yaml`, `markdown`, `text`

### 5. Lists

Bulleted lists:

```typescript
{
  type: "list",
  items: [
    "First item",
    "Second item with **bold** text",
    "Third item with *italic* text"
  ]
}
```

**Note:** You can use markdown-style formatting (`**bold**`, `*italic*`) in list items.

### 6. Images

For images within the content:

```typescript
{
  type: "image",
  src: "/assets/images/your-image.jpg",  // Path from public folder
  alt: "Descriptive alt text for accessibility",
  caption: "Optional caption text",  // Optional
  width: 1920,  // Image width in pixels
  height: 1080,  // Image height in pixels
  quality: "high",  // "low" | "medium" | "high" | "original"
  format: "webp"  // "jpeg" | "png" | "webp" | "avif"
}
```

**Image placement:**
- Place images in `public/assets/images/`
- Use descriptive filenames (e.g., `machine-learning-diagram.jpg`)
- Recommended: Use WebP format with high quality for best performance

## Complete Example

Here's a complete example of a blog post:

```typescript
export const post = {
  id: 4,
  title: "Understanding Neural Networks",
  slug: "understanding-neural-networks",
  excerpt: "A comprehensive guide to neural networks, from basic concepts to advanced architectures.",
  date: "2024-02-15",
  readTime: "12 min read",
  content: [
    {
      type: "text",
      content: "Neural networks are a fundamental concept in machine learning. This post will explore their structure and applications."
    },
    {
      type: "heading",
      level: 2,
      content: "What are Neural Networks?"
    },
    {
      type: "text",
      content: "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers."
    },
    {
      type: "heading",
      level: 3,
      content: "Basic Structure"
    },
    {
      type: "text",
      content: "A simple neural network can be represented mathematically as:"
    },
    {
      type: "latex",
      display: true,
      content: "y = f\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)"
    },
    {
      type: "text",
      content: "Where:"
    },
    {
      type: "list",
      items: [
        "**y** is the output",
        "**f** is the activation function",
        "**w_i** are the weights",
        "**x_i** are the inputs",
        "**b** is the bias term"
      ]
    },
    {
      type: "heading",
      level: 2,
      content: "Implementation Example"
    },
    {
      type: "text",
      content: "Here's a simple Python implementation:"
    },
    {
      type: "code",
      language: "python",
      filename: "neural_network.py",
      content: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        self.W1 = np.random.randn(input_size, hidden_size)
        self.W2 = np.random.randn(hidden_size, output_size)
    
    def forward(self, X):
        self.z1 = np.dot(X, self.W1)
        self.a1 = sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2)
        self.a2 = sigmoid(self.z2)
        return self.a2`
    },
    {
      type: "heading",
      level: 2,
      content: "Visualization"
    },
    {
      type: "image",
      src: "/assets/images/neural-network-diagram.png",
      alt: "Diagram showing the structure of a neural network",
      caption: "A simple neural network with input, hidden, and output layers",
      width: 1200,
      height: 800,
      quality: "high",
      format: "webp"
    },
    {
      type: "heading",
      level: 2,
      content: "Key Takeaways"
    },
    {
      type: "list",
      items: [
        "Neural networks are inspired by biological neurons",
        "They consist of layers of interconnected nodes",
        "Each connection has a weight that is learned during training",
        "Activation functions introduce non-linearity"
      ]
    }
  ],
  images: [
    {
      src: "/assets/images/neural-network-hero.jpg",
      alt: "Neural network visualization",
      caption: "A visualization of a neural network architecture",
      width: 1920,
      height: 1080
    }
  ]
}
```

## Adding Your Post

After creating your post file:

1. **Import it** in `src/infrastructure/data/blog/index.ts`:
   ```typescript
   import { post as yourPostName } from './posts/your-post-file'
   ```

2. **Add it to the array**:
   ```typescript
   export const allPosts: BlogPost[] = [
     // ... existing posts
     yourPostName
   ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   ```

3. **Verify the build**:
   ```bash
   npm run build
   ```

## Best Practices

### Content Organization

1. **Start with an introduction** - Use a text block to introduce your topic
2. **Use headings hierarchically** - Level 2 for main sections, level 3 for subsections
3. **Break up long text** - Use multiple text blocks instead of one very long paragraph
4. **Add spacing** - The system automatically adds spacing between elements

### Images

1. **Optimize images** - Compress images before adding them
2. **Use descriptive alt text** - Important for accessibility
3. **Choose appropriate dimensions** - Use actual image dimensions for width/height
4. **Place in public folder** - All images go in `public/assets/images/`

### LaTeX

1. **Escape backslashes** - Use `\\` instead of `\` in LaTeX strings
2. **Use display mode for equations** - Set `display: true` for standalone equations
3. **Test complex formulas** - Preview to ensure they render correctly

### Code Blocks

1. **Include filenames** - Makes code more professional
2. **Use appropriate languages** - Helps with syntax highlighting
3. **Keep code readable** - Format code properly before pasting

### Dates

- Always use `YYYY-MM-DD` format (e.g., `"2024-02-15"`)
- Use the actual publication date
- Posts are automatically sorted by date (newest first)

## Troubleshooting

### LaTeX not rendering?
- Check that backslashes are escaped (`\\` instead of `\`)
- Ensure MathJax is loaded (should happen automatically)
- Try simpler formulas first to test

### Images not showing?
- Verify the path starts with `/assets/images/`
- Check that the file exists in `public/assets/images/`
- Ensure the filename matches exactly (case-sensitive)

### Code not highlighting?
- Verify the language is supported
- Check spelling of the language name
- Use `"text"` as fallback if unsure

### Build errors?
- Check that all required fields are present (id, title, slug, excerpt, date, readTime)
- Verify TypeScript syntax is correct
- Ensure the post is imported and added to `allPosts` array

## Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify your post structure matches the examples
3. Test with a simple post first, then add complexity
4. Review existing posts for reference

Happy blogging! 🚀

