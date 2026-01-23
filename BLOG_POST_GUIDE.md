# Blog Post Creation Guide

This guide will help you create new blog posts for your portfolio. All blog posts are now **Markdown files** for easy writing!

## Quick Start

1. Create a new `.md` file in `src/infrastructure/data/blog/posts/` (e.g., `post-4.md`)
2. Copy the template below
3. Fill in your content using Markdown
4. Import and add it to `src/infrastructure/data/blog/index.ts`

**Note:** All posts are in a single `posts/` folder - no category subfolders needed!

## File Structure

All blog posts are Markdown files with frontmatter. The structure is:

```markdown
---
id: 4
title: "Your Post Title"
slug: "your-post-slug"
excerpt: "Brief description shown in blog list"
date: "2024-02-15"
readTime: "5 min read"
images:
  - src: "/assets/images/featured.jpg"
    alt: "Featured image"
    caption: "Optional caption"
    width: 1920
    height: 1080
---

# Your Post Title

Your content here in Markdown format...
```

## Frontmatter Fields

All posts must include these fields in the frontmatter (between `---`):

- **id**: Unique number (increment for each post)
- **title**: Post title
- **slug**: URL-friendly version (lowercase, hyphens)
- **excerpt**: Brief description (shown in blog list)
- **date**: Publication date in `YYYY-MM-DD` format
- **readTime**: Estimated reading time (e.g., "5 min read")
- **images** (optional): Array of featured images

## Markdown Content Types

### 1. Text

Just write regular paragraphs:

```markdown
This is a paragraph. It will be rendered as regular text with proper spacing.

This is another paragraph.
```

### 2. Headings

Use standard Markdown headings:

```markdown
# Level 1 Heading (H1)
## Level 2 Heading (H2) - Use for main sections
### Level 3 Heading (H3) - Use for subsections
#### Level 4 Heading (H4) - Use for sub-subsections
```

**Note:** Use level 2 (`##`) for main sections, level 3 (`###`) for subsections.

### 3. LaTeX (Mathematical Expressions)

**Display mode** (centered, on its own line):
```markdown
$$E = mc^2$$
```

**Inline mode** (within text):
```markdown
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.
```

**Common LaTeX examples:**
- Fractions: `\frac{numerator}{denominator}`
- Square roots: `\sqrt{x}` or `\sqrt[n]{x}`
- Superscripts: `x^2`
- Subscripts: `x_1`
- Greek letters: `\alpha`, `\beta`, `\gamma`, `\pi`, `\theta`
- Summation: `\sum_{i=1}^{n}`
- Integrals: `\int_{a}^{b} f(x) dx`
- Matrices: `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`

### 4. Code Blocks

Use fenced code blocks with language:

```markdown
```python
def hello():
    print("Hello, World!")
```
```

**With filename:**
```markdown
```python:example.py
def hello():
    print("Hello, World!")
```
```

**Supported languages:** `javascript`, `typescript`, `python`, `java`, `cpp`, `c`, `html`, `css`, `json`, `xml`, `yaml`, `markdown`, `text`

### 5. Lists

**Bulleted lists:**
```markdown
- First item
- Second item with **bold** text
- Third item with *italic* text
```

**Numbered lists:**
```markdown
1. First item
2. Second item
3. Third item
```

**Note:** You can use markdown formatting (`**bold**`, `*italic*`) in list items.

### 6. Images

**Simple image:**
```markdown
![Alt text](/assets/images/image.jpg)
```

**Image with attributes** (put attributes on the next line):
```markdown
![Alt text](/assets/images/image.jpg)
{width=1920 height=1080 caption="Image caption" quality="high" format="webp"}
```

**Image attributes:**
- `width`: Image width in pixels
- `height`: Image height in pixels
- `caption`: Optional caption text
- `quality`: `"low"`, `"medium"`, `"high"`, or `"original"` (default: `"high"`)
- `format`: `"jpeg"`, `"png"`, `"webp"`, or `"avif"` (default: `"webp"`)

**Image placement:**
- Place images in `public/assets/images/`
- Use descriptive filenames
- Recommended: Use WebP format with high quality

## Complete Example

Here's a complete example of a blog post:

```markdown
---
id: 4
title: "Understanding Neural Networks"
slug: "understanding-neural-networks"
excerpt: "A comprehensive guide to neural networks, from basic concepts to advanced architectures."
date: "2024-02-15"
readTime: "12 min read"
images:
  - src: "/assets/images/neural-network-hero.jpg"
    alt: "Neural network visualization"
    caption: "A visualization of a neural network architecture"
    width: 1920
    height: 1080
---

Neural networks are a fundamental concept in machine learning. This post will explore their structure and applications.

## What are Neural Networks?

Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers.

### Basic Structure

A simple neural network can be represented mathematically as:

$$\mathbf{y} = f\left(\sum_{i=1}^{n} w_i x_i + b\right)$$

Where:
- **y** is the output
- **f** is the activation function
- **w_i** are the weights
- **x_i** are the inputs
- **b** is the bias term

## Implementation Example

Here's a simple Python implementation:

```python:neural_network.py
import numpy as np

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
        return self.a2
```

## Visualization

![Neural network diagram](/assets/images/neural-network-diagram.png)
{width=1200 height=800 caption="A simple neural network with input, hidden, and output layers" quality="high" format="webp"}

## Key Takeaways

- **Neural networks** are inspired by biological neurons
- They consist of **layers of interconnected nodes**
- Each connection has a **weight that is learned during training**
- **Activation functions** introduce non-linearity
```

## Adding Your Post

After creating your markdown file:

1. **Import it** in `src/infrastructure/data/blog/index.ts`:
   ```typescript
   import post4Md from './posts/post-4.md?raw';
   ```

2. **Parse and add it to the array**:
   ```typescript
   const post4 = parseMarkdownPost(post4Md);
   
   export const allPosts: BlogPost[] = [
     post1,
     post2,
     post3,
     post4  // Add your new post here
   ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   ```

**Note:** Posts are automatically sorted by date (newest first), so the order in the array doesn't matter.

## Best Practices

### Content Organization

1. **Start with an introduction** - Use a paragraph to introduce your topic
2. **Use headings hierarchically** - Level 2 for main sections, level 3 for subsections
3. **Break up long text** - Use multiple paragraphs instead of one very long paragraph
4. **Add spacing** - The system automatically adds spacing between elements

### Images

1. **Optimize images** - Compress images before adding them
2. **Use descriptive alt text** - Important for accessibility
3. **Choose appropriate dimensions** - Use actual image dimensions for width/height
4. **Place in public folder** - All images go in `public/assets/images/`

### LaTeX

1. **Escape backslashes** - Use `\\` instead of `\` in LaTeX strings (already handled in markdown)
2. **Use display mode for equations** - Use `$$...$$` for standalone equations
3. **Test complex formulas** - Preview to ensure they render correctly

### Code Blocks

1. **Include filenames** - Use `language:filename.ext` syntax
2. **Use appropriate languages** - Helps with syntax highlighting
3. **Keep code readable** - Format code properly before pasting

### Dates

- Always use `YYYY-MM-DD` format (e.g., `"2024-02-15"`)
- Use the actual publication date
- Posts are automatically sorted by date (newest first)

## Markdown Tips

- Use `**bold**` for bold text
- Use `*italic*` for italic text
- Use `-` for bulleted lists
- Use `1.` for numbered lists
- Use `[link text](url)` for links
- Use `> ` for blockquotes

## Troubleshooting

### LaTeX not rendering?
- Check that you're using `$$...$$` for display mode
- Ensure MathJax is loaded (should happen automatically)
- Try simpler formulas first to test

### Images not showing?
- Verify the path starts with `/assets/images/`
- Check that the file exists in `public/assets/images/`
- Ensure the filename matches exactly (case-sensitive)

### Code not highlighting?
- Verify the language is supported
- Check spelling of the language name
- Use `text` as fallback if unsure

### Build errors?
- Check that all required frontmatter fields are present
- Verify the frontmatter format is correct (YAML-like)
- Ensure the markdown file is imported in `index.ts`
- Check that the post is parsed and added to `allPosts` array

## Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify your markdown structure matches the examples
3. Test with a simple post first, then add complexity
4. Review existing markdown posts for reference

Happy blogging! 🚀
