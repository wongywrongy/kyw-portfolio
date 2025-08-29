# Individual Post Files Guide

This guide explains how to manage your blog content using individual post files - each post is now its own separate file for maximum flexibility and ease of editing.

## 📁 New Blog Structure

Your blog content is now organized with individual files:

```
src/content/blog/
├── index.ts                    # Main index file (combines all posts)
└── posts/
    ├── research/
    │   └── post-1.ts          # Individual research post
    └── blog/
    │   └── post-1.ts          # Individual blog post
    └── projects/
        └── post-1.ts          # Individual project post
```

## ✏️ Adding New Posts

### Step 1: Create a New Post File

**For Research Posts:**
Create a new file in `src/content/blog/posts/research/` (e.g., `post-2.ts`):

```typescript
export const post = {
  id: 3, // Use next available ID
  title: "Your New Research Post Title",
  excerpt: "Brief description of your research post...",
  category: "research", // Must be "research"
  date: "2024-01-30", // YYYY-MM-DD format
  readTime: "10 min read",
  tags: ["AI", "Machine Learning", "Research"],
  content: `
# Your Post Title

Your post content goes here. You can use markdown formatting.

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 2

- Point 1: Lorem ipsum
- Point 2: Dolor sit amet
- Point 3: Consectetur adipiscing

## Conclusion

Your conclusion here.
  `
}
```

**For Blog Posts:**
Create a new file in `src/content/blog/posts/blog/` (e.g., `post-2.ts`):

```typescript
export const post = {
  id: 4, // Use next available ID
  title: "Your New Blog Post Title",
  excerpt: "Brief description of your blog post...",
  category: "blog", // Must be "blog"
  date: "2024-01-25", // YYYY-MM-DD format
  readTime: "5 min read",
  tags: ["Web Development", "Technology"],
  content: `
# Your Blog Post Title

Your blog post content goes here.

## Introduction

Lorem ipsum dolor sit amet.

## Main Content

Your main content here.

## Conclusion

Wrap up your thoughts.
  `,
  images: [
    {
      src: "https://example.com/your-image.jpg",
      alt: "Description of the image",
      caption: "Optional caption for the image",
      width: 800,
      height: 400
    }
  ]
}
```

**For Project Posts:**
Create a new file in `src/content/blog/posts/projects/` (e.g., `post-2.ts`):

```typescript
export const post = {
  id: 5, // Use next available ID
  title: "Your New Project Title",
  excerpt: "Brief description of your project...",
  category: "projects", // Must be "projects"
  date: "2024-01-30", // YYYY-MM-DD format
  readTime: "6 min read",
  tags: ["React", "TypeScript", "Project"],
  content: `
# Your Project Title

Your project content goes here.

## Project Overview

Lorem ipsum dolor sit amet.

## Technologies Used

- Technology 1: Description
- Technology 2: Description

## Key Features

- Feature 1: Description
- Feature 2: Description

## Results

Your project results and outcomes.
  `,
  images: [
    {
      src: "https://example.com/project-screenshot.jpg",
      alt: "Project screenshot",
      caption: "Screenshot of the project in action",
      width: 800,
      height: 400
    }
  ]
}
```

### Step 2: Import the New Post

Edit `src/content/blog/index.ts` and add the import:

```typescript
// Import individual post files
import { post as researchPost1 } from './posts/research/post-1'
import { post as researchPost2 } from './posts/research/post-2' // Add this line
import { post as blogPost1 } from './posts/blog/post-1'
import { post as blogPost2 } from './posts/blog/post-2' // Add this line

// ... rest of the file ...

// Combine all posts from individual files
export const allPosts: BlogPost[] = [
  researchPost1,
  researchPost2, // Add this line
  blogPost1,
  blogPost2 // Add this line
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
```

## 🏷️ Post File Structure

Each post file exports a single object with these properties:

```typescript
{
  id: number,           // Unique identifier (required)
  title: string,        // Post title (required)
  excerpt: string,      // Brief description (required)
  category: string,     // "research" or "blog" (required)
  date: string,         // YYYY-MM-DD format (required)
  readTime: string,     // e.g., "5 min read" (required)
  tags: string[],       // Array of tags (required)
  content?: string      // Full post content in markdown (optional)
}
```

## 📝 Editing Existing Posts

### To Edit a Post:
1. Open the specific post file (e.g., `src/content/blog/posts/research/post-1.ts`)
2. Modify any property (title, excerpt, content, tags, etc.)
3. Save the file
4. Changes appear immediately on your website

### To Delete a Post:
1. Delete the post file
2. Remove the import from `src/content/blog/index.ts`
3. Remove the post from the `allPosts` array

## 🔄 How It Works

1. **Individual Files**: Each post is its own TypeScript file
2. **Automatic Import**: Posts are imported and combined in `index.ts`
3. **Automatic Sorting**: Posts are sorted by date (newest first)
4. **Category Filtering**: Website automatically filters by category
5. **Hot Reload**: Changes appear immediately without restarting

## 📋 Example: Complete Workflow

### Step 1: Create a New Research Post

Create `src/content/blog/posts/research/post-2.ts`:

```typescript
export const post = {
  id: 3,
  title: "Advanced Neural Network Architectures",
  excerpt: "Exploring cutting-edge neural network designs and their applications.",
  category: "research",
  date: "2024-01-30",
  readTime: "15 min read",
  tags: ["Neural Networks", "AI", "Deep Learning"],
  content: `
# Advanced Neural Network Architectures

This post explores the latest developments in neural network design.

## Introduction

Neural networks have evolved significantly in recent years...

## Key Architectures

- Transformer models
- Attention mechanisms
- Multi-head attention

## Applications

Real-world applications of these architectures...
  `
}
```

### Step 2: Update the Index File

Edit `src/content/blog/index.ts`:

```typescript
// Import individual post files
import { post as researchPost1 } from './posts/research/post-1'
import { post as researchPost2 } from './posts/research/post-2' // Add this
import { post as blogPost1 } from './posts/blog/post-1'

// ... rest of imports ...

// Combine all posts from individual files
export const allPosts: BlogPost[] = [
  researchPost1,
  researchPost2, // Add this
  blogPost1
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
```

### Step 3: View Results

- Save all files
- New post appears immediately on your website
- Automatically sorted by date
- Category filtering works immediately

## 🎯 Best Practices

### File Naming
- Use descriptive names: `post-1.ts`, `post-2.ts`, etc.
- Or use meaningful names: `machine-learning-autonomous-vehicles.ts`

### ID Management
- Use sequential IDs (1, 2, 3, etc.)
- Keep track of the highest ID used
- Don't reuse IDs

### Content Organization
- Keep related posts in the same category folder
- Use consistent formatting in your markdown content
- Include proper headings and structure

### Import Management
- Always add imports to `index.ts` when creating new posts
- Remove imports when deleting posts
- Keep the `allPosts` array in sync with imports

## 🆘 Troubleshooting

### Post Not Appearing
- Check that the file is imported in `index.ts`
- Verify the post is included in the `allPosts` array
- Ensure the ID is unique
- Check that the category matches exactly

### Import Errors
- Verify the file path is correct
- Check that the export name matches the import
- Ensure all required properties are included

### Content Not Updating
- Save all files (post file and index.ts)
- Check that the import is correct
- Verify the post is in the `allPosts` array

## 📚 Benefits of Individual Files

1. **Easy Editing**: Edit one post without affecting others
2. **Version Control**: Track changes to individual posts
3. **Organization**: Clear file structure by category
4. **Scalability**: Easy to add many posts
5. **Content Management**: Full post content in each file
6. **Flexibility**: Each post can have different structures

## 🔄 After Making Changes

1. Save the post file
2. Save the index.ts file (if you added imports)
3. Changes appear immediately in your browser
4. No need to restart the development server
5. All filtering and sorting works automatically

This individual file system gives you maximum flexibility and control over your blog content!

## 🌍 Multilingual Support

The blog system supports multiple languages including Korean (한국어) and Chinese (中文). You can:

- **Mix languages freely** in your content
- **Use Korean characters**: 안녕하세요, 블로그 포스트
- **Use Chinese characters**: 你好，博客文章
- **Combine languages**: English, 한국어, 中文 in the same post

The system uses Noto Sans fonts for optimal multilingual display.

### Example Multilingual Content:

```typescript
content: `
# Multilingual Blog Post

안녕하세요! 你好! Hello! This post shows multilingual support.

## Korean Section (한국어 섹션)

한국어로 작성된 블로그 포스트입니다. 이 시스템은 한글을 완벽하게 지원합니다.

## Chinese Section (中文部分)

这是一个支持中文的博客系统。你可以用中文写博客文章。

## Mixed Content

You can mix languages: English, 한국어, 中文, and more!
`
```

## 🖼️ Image Support

You can add images to your posts using the `images` array:

```typescript
images: [
  {
    src: "https://example.com/image.jpg", // Image URL
    alt: "Description for accessibility", // Alt text
    caption: "Optional caption below image", // Optional caption
    width: 800, // Optional width
    height: 400 // Optional height
  }
]
```

### Image Guidelines:
- **High Quality**: Use images with 800px+ width for best display
- **Accessibility**: Include descriptive alt text
- **Context**: Add captions to provide context
- **Performance**: Images support lazy loading
- **Display**: Images appear below the main content
- **Styling**: Automatically styled with rounded corners and shadows

### Example with Images:

```typescript
export const post = {
  // ... other properties ...
  content: `Your markdown content here...`,
  images: [
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      alt: "Beautiful landscape",
      caption: "A stunning landscape from Unsplash",
      width: 800,
      height: 400
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      alt: "Code on screen",
      caption: "Programming and development",
      width: 800,
      height: 400
    }
  ]
}
```
