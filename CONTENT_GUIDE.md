# Content Management Guide

This guide explains how to easily modify the content of your portfolio website without touching the main code.

## 📁 Content Files Location

All content is stored in the `src/content/` directory:
- `about.ts` - About Me page content
- `blog.ts` - My Mind (blog) page content

## ✏️ Modifying About Me Content

### File: `src/content/about.ts`

To modify the About Me page content, edit the `aboutContent` object:

```typescript
export const aboutContent = {
  title: "About Me", // Page title
  sections: [
    {
      title: "Introduction", // Section heading
      content: "Your introduction text here..." // Section content
    },
    {
      title: "Background", // Section heading
      content: "Your background text here..." // Section content
    },
    // Add more sections as needed
  ]
}
```

### How to Add/Remove Sections

**To add a new section:**
```typescript
{
  title: "New Section",
  content: "Your new section content here..."
}
```

**To remove a section:**
Simply delete the entire section object from the `sections` array.

**To reorder sections:**
Move the section objects around in the `sections` array.

## 📝 Modifying My Mind (Blog) Content

### File: `src/content/blog.ts`

To modify the blog content, edit the `blogContent` object:

```typescript
export const blogContent = {
  title: "My Mind", // Page title
  categories: [
    { id: 'all', label: 'All Posts', icon: 'FileText' },
    { id: 'research', label: 'Research', icon: 'BookOpen' },
    // Add more categories
  ],
  posts: [
    {
      id: 1, // Unique ID for each post
      title: "Post Title",
      excerpt: "Brief description of the post...",
      category: "research", // Must match a category id
      date: "2024-01-15", // YYYY-MM-DD format
      readTime: "8 min read",
      tags: ["Tag1", "Tag2", "Tag3"] // Array of tags
    },
    // Add more posts
  ]
}
```

### How to Add/Remove Blog Posts

**To add a new post:**
```typescript
{
  id: 7, // Use the next available ID
  title: "Your New Post Title",
  excerpt: "Brief description of your new post...",
  category: "blog", // Must match an existing category
  date: "2024-01-20",
  readTime: "5 min read",
  tags: ["Your", "Tags", "Here"]
}
```

**To remove a post:**
Delete the entire post object from the `posts` array.

**To edit an existing post:**
Simply modify the values in the post object.

### How to Add/Remove Categories

**To add a new category:**
```typescript
{ id: 'newcategory', label: 'New Category', icon: 'Tag' }
```

**Available icons:**
- `FileText` - General documents
- `BookOpen` - Research/books
- `Tag` - Tags/labels

**To remove a category:**
1. Delete the category from the `categories` array
2. Remove or update any posts that use that category

## 🎨 Content Formatting Tips

### Text Content
- Use regular text for paragraphs
- Line breaks are preserved
- You can use basic HTML-like formatting in the content

### Dates
- Use YYYY-MM-DD format (e.g., "2024-01-15")
- This ensures proper sorting and display

### Tags
- Keep tags short and relevant
- Use 2-4 tags per post for best display
- Tags are automatically limited to 3 in the UI

## 🔄 After Making Changes

1. Save the content file
2. The changes will automatically appear on your website
3. No need to restart the development server
4. The website will hot-reload with your new content

## 📋 Example: Complete About Me Update

```typescript
export const aboutContent = {
  title: "About Kyle Wong",
  sections: [
    {
      title: "Introduction",
      content: "I'm Kyle Wong, a passionate Computer Science student at San Jose State University. I specialize in artificial intelligence and software development, with a particular focus on machine learning applications."
    },
    {
      title: "Education",
      content: "I'm currently pursuing my Computer Science degree at San Jose State University, where I've developed a strong foundation in algorithms, data structures, and software engineering principles."
    },
    {
      title: "Research",
      content: "I'm actively involved in applied AI research at Sungkyunkwan University, working on cutting-edge machine learning projects that have real-world applications."
    },
    {
      title: "Open Source",
      content: "As a Debian apprentice, I contribute to the open-source community and believe in the power of collaborative software development to solve complex problems."
    }
  ]
}
```

## 🆘 Need Help?

If you need assistance with content modification:
1. Check this guide first
2. Look at the existing content structure for examples
3. The content files are well-commented and self-explanatory
4. All changes are immediately visible in your browser
