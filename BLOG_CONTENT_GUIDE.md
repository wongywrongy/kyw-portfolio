# Blog Content Management Guide

This guide explains how to easily modify and manage your blog content with the new organized folder structure.

## 📁 Blog Content Structure

Your blog content is now organized in separate files for easy management:

```
src/content/blog/
├── index.ts          # Main index file (combines all posts)
├── research.ts       # Research posts only
└── blog.ts          # General blog posts only
```

## ✏️ Adding New Blog Posts

### For Research Posts

Edit `src/content/blog/research.ts`:

```typescript
export const researchPosts: BlogPost[] = [
  // ... existing posts ...
  {
    id: 7, // Use next available ID
    title: "Your New Research Post",
    excerpt: "Brief description of your research...",
    category: "research", // Must be "research"
    date: "2024-01-20", // YYYY-MM-DD format
    readTime: "10 min read",
    tags: ["AI", "Machine Learning", "Research"]
  }
]
```

### For General Blog Posts

Edit `src/content/blog/blog.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  // ... existing posts ...
  {
    id: 8, // Use next available ID
    title: "Your New Blog Post",
    excerpt: "Brief description of your blog post...",
    category: "blog", // Must be "blog"
    date: "2024-01-25", // YYYY-MM-DD format
    readTime: "5 min read",
    tags: ["Web Development", "Technology"]
  }
]
```

## 🏷️ Blog Post Structure

Each blog post has the following properties:

```typescript
{
  id: number,           // Unique identifier (required)
  title: string,        // Post title (required)
  excerpt: string,      // Brief description (required)
  category: string,     // "research" or "blog" (required)
  date: string,         // YYYY-MM-DD format (required)
  readTime: string,     // e.g., "5 min read" (required)
  tags: string[]        // Array of tags (required)
}
```

## 📝 Managing Categories

Categories are defined in `src/content/blog/index.ts`:

```typescript
export const categories: BlogCategory[] = [
  { id: 'all', label: 'All Posts', icon: 'FileText' },
  { id: 'research', label: 'Research', icon: 'BookOpen' },
  { id: 'blog', label: 'Blog', icon: 'FileText' },
  { id: 'projects', label: 'Projects', icon: 'Tag' }
]
```

### Adding New Categories

1. Add the category to the `categories` array
2. Create a new file for that category (e.g., `tutorial.ts`)
3. Add posts to the new category file
4. Import and include the new posts in `index.ts`

**Note:** Currently only "research" and "blog" categories are active. Add new categories only if needed.

## 🔄 How It Works

1. **Automatic Combination**: The `index.ts` file automatically combines all posts from different category files
2. **Automatic Sorting**: Posts are automatically sorted by date (newest first)
3. **Category Filtering**: The website automatically filters posts by category
4. **Hot Reload**: Changes appear immediately without restarting the server

## 📋 Example: Complete Workflow

### Step 1: Add a New Research Post

Edit `src/content/blog/research.ts`:

```typescript
export const researchPosts: BlogPost[] = [
  // ... existing posts ...
  {
    id: 7,
    title: "Advanced Neural Network Architectures",
    excerpt: "Exploring cutting-edge neural network designs and their applications in modern AI systems.",
    category: "research",
    date: "2024-01-30",
    readTime: "15 min read",
    tags: ["Neural Networks", "AI", "Deep Learning", "Research"]
  }
]
```

### Step 2: Add a New Blog Post

Edit `src/content/blog/blog.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  // ... existing posts ...
  {
    id: 8,
    title: "My Experience with React 19",
    excerpt: "Personal insights and lessons learned while working with the latest React features.",
    category: "blog",
    date: "2024-01-28",
    readTime: "8 min read",
    tags: ["React", "Frontend", "JavaScript", "Web Development"]
  }
]
```

### Step 3: View Results

- Save the files
- The new posts automatically appear on your website
- They're automatically sorted by date
- Category filtering works immediately

## 🎯 Best Practices

### ID Management
- Use sequential IDs (1, 2, 3, etc.)
- Keep track of the highest ID used
- Don't reuse IDs

### Dates
- Use YYYY-MM-DD format
- Posts are automatically sorted by date
- Newer posts appear first

### Tags
- Use 2-4 tags per post
- Keep tags relevant and specific
- Use consistent capitalization

### Categories
- Research posts: Use "research" category
- General posts: Use "blog" category
- Add new categories only if needed

## 🆘 Troubleshooting

### Posts Not Appearing
- Check that the ID is unique
- Verify the category matches exactly ("research" or "blog")
- Ensure the date format is correct (YYYY-MM-DD)

### Category Not Working
- Make sure the category ID matches exactly
- Check that posts have the correct category value
- Verify the category is included in the categories array

### Import Errors
- Check file paths are correct
- Ensure all required properties are included
- Verify TypeScript syntax is correct

## 📚 Available Icons

For categories, you can use these icons:
- `FileText` - General documents
- `BookOpen` - Research/books
- `Tag` - Tags/labels

## 🔄 After Making Changes

1. Save the content file
2. Changes appear immediately in your browser
3. No need to restart the development server
4. All filtering and sorting works automatically

This new structure makes it much easier to manage your blog content by category while maintaining all the functionality of your website!
