/**
 * Fetch individual blog post data at build time
 * This is called for each blog post slug
 */

import { createClient } from '@sanity/client';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectId = process.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.VITE_SANITY_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
  perspective: 'published',
});

const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  date,
  readTime,
  "featuredImage": featuredImage {
    asset-> {
      _id,
      _ref,
      _type
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
        _ref,
        _type
      },
      alt,
      caption,
      width,
      align
    }
  }
}`;

async function fetchBlogPost(slug) {
  const outputDir = join(__dirname, '../src/infrastructure/data/cms/blogPosts');
  mkdirSync(outputDir, { recursive: true });
  
  try {
    const data = await client.fetch(blogPostBySlugQuery, { slug });
    if (data) {
      writeFileSync(join(outputDir, `${slug}.json`), JSON.stringify(data, null, 2));
      console.log(`✅ Fetched blog post: ${slug}`);
    }
  } catch (error) {
    console.warn(`Failed to fetch blog post ${slug}:`, error.message);
  }
}

// Get slug from command line argument
const slug = process.argv[2];
if (slug) {
  fetchBlogPost(slug);
}
