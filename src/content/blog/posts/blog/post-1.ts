export const post = {
  id: 2,
  title: "Multilingual Blog Post with Images",
  excerpt: "This is an example blog post demonstrating support for images and foreign languages like Korean and Chinese.",
  category: "blog",
  date: "2024-01-10",
  readTime: "5 min read",
  tags: ["Multilingual", "Images", "Korean", "Chinese", "Example"],
  content: `
# Multilingual Blog Post with Images

This is an example blog post demonstrating support for images and foreign languages like Korean and Chinese.

## Introduction

안녕하세요! 你好! Hello! This post shows how the blog system supports multiple languages and images.

## Korean Section (한국어 섹션)

한국어로 작성된 블로그 포스트입니다. 이 시스템은 한글을 완벽하게 지원합니다.

### Key Points in Korean:
- 첫 번째 포인트: 한국어 지원
- 두 번째 포인트: 이미지 지원
- 세 번째 포인트: 다국어 지원

## Chinese Section (中文部分)

这是一个支持中文的博客系统。你可以用中文写博客文章。

### 中文要点：
- 第一点：中文支持
- 第二点：图片支持
- 第三点：多语言支持

## Mixed Language Content

You can mix languages freely: English, 한국어, 中文, and more!

### Example Mixed Content:
- English: This works perfectly
- 한국어: 이것도 완벽하게 작동합니다
- 中文: 这也完美地工作

## Conclusion

다국어 지원과 이미지 기능이 모두 잘 작동합니다! 多语言支持和图片功能都很好用! All features work perfectly!
  `,
  images: [
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      alt: "Example image 1",
      caption: "A beautiful example image from Unsplash",
      width: 800,
      height: 400
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      alt: "Example image 2",
      caption: "Another example image showing code",
      width: 800,
      height: 400
    }
  ]
}
