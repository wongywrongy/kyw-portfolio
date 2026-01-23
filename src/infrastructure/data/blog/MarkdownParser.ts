/**
 * Markdown Parser for Blog Posts
 * 
 * Converts markdown files with frontmatter to BlogPost format
 * Supports LaTeX, images with attributes, code blocks, and more
 */

import { marked } from 'marked';
import type { ContentItem, BlogPost, BlogImage } from '../../shared/types';

/**
 * Frontmatter interface
 */
interface Frontmatter {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
}

/**
 * Parses frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: Frontmatter; markdown: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Markdown file must start with frontmatter (---)');
  }

  const frontmatterText = match[1];
  const markdown = match[2];

  // Parse frontmatter (simple YAML-like parsing)
  const frontmatter: Partial<Frontmatter> = {};
  const lines = frontmatterText.split('\n');
  let inImagesArray = false;
  let currentImage: any = null;
  const images: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if we're entering images array
    if (trimmed === 'images:' || trimmed.startsWith('images:')) {
      inImagesArray = true;
      continue;
    }
    
    // Check if we're in an images array item
    if (inImagesArray) {
      // Check for array item start: "- src: ..." or "-" on its own
      if (trimmed.startsWith('-')) {
        if (currentImage) {
          images.push(currentImage);
        }
        currentImage = {};
        // Extract src if on same line
        const srcMatch = trimmed.match(/src:\s*(.+)/);
        if (srcMatch) {
          let srcValue = srcMatch[1].trim();
          if ((srcValue.startsWith('"') && srcValue.endsWith('"')) || 
              (srcValue.startsWith("'") && srcValue.endsWith("'"))) {
            srcValue = srcValue.slice(1, -1);
          }
          currentImage.src = srcValue;
        }
        continue;
      }
      
      // Parse image properties
      if (currentImage && trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':');
        const key = trimmed.slice(0, colonIndex).trim();
        let value = trimmed.slice(colonIndex + 1).trim();
        
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        if (key === 'src') {
          currentImage.src = value;
        } else if (key === 'alt') {
          currentImage.alt = value;
        } else if (key === 'caption') {
          currentImage.caption = value;
        } else if (key === 'width') {
          currentImage.width = parseInt(value, 10);
        } else if (key === 'height') {
          currentImage.height = parseInt(value, 10);
        }
        continue;
      }
      
      // If we hit a non-indented line, we're done with images
      if (trimmed.length > 0 && !trimmed.startsWith(' ') && !trimmed.startsWith('-')) {
        inImagesArray = false;
        if (currentImage) {
          images.push(currentImage);
          currentImage = null;
        }
      }
    }
    
    // Regular key-value parsing
    if (!inImagesArray) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      switch (key) {
        case 'id':
          frontmatter.id = parseInt(value, 10);
          break;
        case 'title':
          frontmatter.title = value;
          break;
        case 'slug':
          frontmatter.slug = value;
          break;
        case 'excerpt':
          frontmatter.excerpt = value;
          break;
        case 'date':
          frontmatter.date = value;
          break;
        case 'readTime':
          frontmatter.readTime = value;
          break;
      }
    }
  }
  
  // Add last image if exists
  if (currentImage) {
    images.push(currentImage);
  }
  
  // Add images to frontmatter if any
  if (images.length > 0) {
    frontmatter.images = images;
  }

  // Validate required fields
  if (!frontmatter.id || !frontmatter.title || !frontmatter.slug || 
      !frontmatter.excerpt || !frontmatter.date || !frontmatter.readTime) {
    throw new Error('Frontmatter must include: id, title, slug, excerpt, date, readTime');
  }

  return {
    frontmatter: frontmatter as Frontmatter,
    markdown
  };
}

/**
 * Converts markdown tokens to ContentItem array
 */
function tokensToContentItems(tokens: marked.Token[]): ContentItem[] {
  const items: ContentItem[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.type) {
      case 'paragraph':
        const paragraph = token as marked.Tokens.Paragraph;
        let text = paragraph.text.trim();
        
        if (text.length === 0) break;
        
        // Check for LaTeX display: $$...$$
        const displayLatexMatch = text.match(/^\$\$([\s\S]+?)\$\$$/);
        if (displayLatexMatch) {
          items.push({
            type: 'latex',
            display: true,
            content: displayLatexMatch[1].trim()
          });
          break;
        }
        
        // Check for inline LaTeX: $...$ (but not $$...$$)
        // Split text by inline LaTeX and process each part
        const inlineLatexRegex = /\$([^$\n]+?)\$/g;
        const parts: Array<{ type: 'text' | 'latex'; content: string; display?: boolean }> = [];
        let lastIndex = 0;
        let match;
        
        while ((match = inlineLatexRegex.exec(text)) !== null) {
          // Add text before LaTeX
          if (match.index > lastIndex) {
            const textPart = text.slice(lastIndex, match.index).trim();
            if (textPart) {
              parts.push({ type: 'text', content: textPart });
            }
          }
          // Add LaTeX
          parts.push({ type: 'latex', content: match[1].trim(), display: false });
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          const textPart = text.slice(lastIndex).trim();
          if (textPart) {
            parts.push({ type: 'text', content: textPart });
          }
        }
        
        // If we found LaTeX, add parts separately, otherwise add as single text
        if (parts.length > 0 && parts.some(p => p.type === 'latex')) {
          for (const part of parts) {
            if (part.type === 'latex') {
              items.push({
                type: 'latex',
                display: part.display || false,
                content: part.content
              });
            } else {
              items.push({
                type: 'text',
                content: part.content
              });
            }
          }
        } else {
          items.push({
            type: 'text',
            content: text
          });
        }
        break;

      case 'heading':
        const heading = token as marked.Tokens.Heading;
        items.push({
          type: 'heading',
          level: heading.depth as 1 | 2 | 3 | 4,
          content: heading.text
        });
        break;

      case 'list':
        const list = token as marked.Tokens.List;
        const listItems: string[] = [];
        
        for (const item of list.items) {
          // Process list item text (may contain markdown)
          let itemText = item.text;
          // Convert markdown bold/italic to HTML
          itemText = itemText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          itemText = itemText.replace(/\*(.+?)\*/g, '<em>$1</em>');
          listItems.push(itemText);
        }
        
        items.push({
          type: 'list',
          items: listItems
        });
        break;

      case 'code':
        const code = token as marked.Tokens.Code;
        // Check for filename in language: "python:filename.py"
        const langMatch = code.lang?.match(/^(\w+)(?::(.+))?$/);
        const language = langMatch ? langMatch[1] : (code.lang || 'text');
        const filename = langMatch && langMatch[2] ? langMatch[2] : undefined;
        
        items.push({
          type: 'code',
          language: language as any,
          filename,
          content: code.text
        });
        break;

      case 'image':
        const image = token as marked.Tokens.Image;
        let imageAttrs: any = {
          src: image.href,
          alt: image.text || ''
        };
        
        // Look ahead for paragraph token with attributes on next line
        if (i + 1 < tokens.length && tokens[i + 1].type === 'paragraph') {
          const para = tokens[i + 1] as marked.Tokens.Paragraph;
          // Check if paragraph contains attribute syntax: {key=value}
          const attrMatch = para.text.trim().match(/^\{([^}]+)\}$/);
          if (attrMatch) {
            const attrs = attrMatch[1];
            const attrRegex = /(\w+)=([^\s"']+|"[^"]*"|'[^']*')/g;
            let attrMatch2;
            while ((attrMatch2 = attrRegex.exec(attrs)) !== null) {
              let value = attrMatch2[2];
              if ((value.startsWith('"') && value.endsWith('"')) || 
                  (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
              }
              const key = attrMatch2[1];
              if (key === 'width' || key === 'height') {
                imageAttrs[key] = parseInt(value, 10);
              } else {
                imageAttrs[key] = value;
              }
            }
            i++; // Skip the paragraph token with attributes
          }
        }
        
        items.push({
          type: 'image',
          src: imageAttrs.src,
          alt: imageAttrs.alt,
          caption: imageAttrs.caption,
          width: imageAttrs.width,
          height: imageAttrs.height,
          quality: imageAttrs.quality,
          format: imageAttrs.format
        });
        break;

      case 'html':
        // Check for LaTeX in HTML comments: <!--latex:display:...-->
        const html = token as marked.Tokens.HTML;
        const latexCommentMatch = html.raw.match(/<!--latex:(inline|display):(.+?)-->/s);
        if (latexCommentMatch) {
          items.push({
            type: 'latex',
            display: latexCommentMatch[1] === 'display',
            content: latexCommentMatch[2].trim()
          });
        }
        break;
    }
  }

  return items;
}

/**
 * Parses a markdown file to BlogPost format
 */
export function parseMarkdownPost(markdownContent: string): BlogPost {
  const { frontmatter, markdown } = parseFrontmatter(markdownContent);

  // Configure marked
  marked.setOptions({
    gfm: true,
    breaks: false
  });

  // Parse markdown to tokens
  const tokens = marked.lexer(markdown);
  
  // Convert tokens to ContentItem array
  const content = tokensToContentItems(tokens);

  // Build BlogPost
  const post: BlogPost = {
    id: frontmatter.id,
    title: frontmatter.title,
    slug: frontmatter.slug,
    excerpt: frontmatter.excerpt,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    content
  };

  // Add featured images if provided
  if (frontmatter.images && frontmatter.images.length > 0) {
    post.images = frontmatter.images.map(img => ({
      src: img.src,
      alt: img.alt,
      caption: img.caption,
      width: img.width,
      height: img.height
    }));
  }

  return post;
}

