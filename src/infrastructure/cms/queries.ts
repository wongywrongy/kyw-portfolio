/**
 * Sanity CMS Queries
 * 
 * This file contains all GROQ queries for fetching content from Sanity.
 * GROQ is Sanity's query language - similar to GraphQL but for JSON data.
 */

// Home page query
export const homeQuery = `*[_type == "home"][0]{
  hero {
    name,
    description
  },
  about {
    title,
    paragraphs
  },
  blog {
    title,
    subtitle
  },
  contact {
    title,
    subtitle,
    contacts[] {
      label,
      value,
      href,
      description
    }
  }
}`;

// About page query
export const aboutQuery = `*[_type == "about"][0]{
  title,
  sections[] {
    title,
    content
  }
}`;

// All blog posts query (for listing page)
export const allBlogPostsQuery = `*[_type == "blogPost"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  date,
  readTime,
  "featuredImage": featuredImage {
    asset-> {
      _id,
      url
    },
    alt,
    caption
  }
}`;

// Single blog post query (by slug) - parameterized to prevent injection
export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  date,
  readTime,
  "featuredImage": featuredImage {
    asset-> {
      _id,
      url
    },
    alt,
    caption
  },
  content[] {
    type,
    content,
    level,
    language,
    code,
    display,
    ordered,
    items,
    "image": image {
      asset-> {
        _id,
        url
      },
      alt,
      caption,
      width,
      align
    }
  }
}`;

// Resume query
export const resumeQuery = `*[_type == "resume"][0]{
  title,
  introText,
  "pdfUrl": pdfFile.asset->url,
  downloadText,
  lastUpdated,
  showLastUpdated
}`;

// Site settings query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  socialLinks[] {
    platform,
    url,
    icon
  },
  footerText {
    copyright,
    additionalText
  },
  navigationLinks[] {
    label,
    path,
    order
  }
}`;
