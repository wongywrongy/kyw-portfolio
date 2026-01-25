/**
 * Build-time CMS Data Fetcher
 * 
 * This script fetches all CMS data at build time and saves it as JSON files.
 * This avoids CORS issues by fetching server-side during build.
 */

import { createClient } from '@sanity/client';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get environment variables
const projectId = process.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.VITE_SANITY_TOKEN;

// Create Sanity client (server-side, no CORS issues)
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
  perspective: 'published',
});

// Queries
const homeQuery = `*[_type == "home"][0]{
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

const aboutQuery = `*[_type == "about"][0]{
  title,
  sections[] {
    title,
    content
  }
}`;

const allBlogPostsQuery = `*[_type == "blogPost"] | order(date desc) {
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
  }
}`;

const resumeQuery = `*[_type == "resume"][0]{
  title,
  introText,
  "pdfUrl": pdfFile.asset->url,
  downloadText,
  lastUpdated,
  showLastUpdated
}`;

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
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

async function fetchData() {
  console.log('Fetching CMS data at build time...');
  console.log(`Project ID: ${projectId}, Dataset: ${dataset}`);
  
  const outputDir = join(__dirname, '../src/infrastructure/data/cms');
  const blogPostsDir = join(outputDir, 'blogPosts');
  
  // Create directories if they don't exist
  mkdirSync(outputDir, { recursive: true });
  mkdirSync(blogPostsDir, { recursive: true });

  try {
    // Fetch all data
    const [home, about, blogPosts, resume, siteSettings] = await Promise.all([
      client.fetch(homeQuery).catch(err => {
        console.warn('Failed to fetch home:', err.message);
        return null;
      }),
      client.fetch(aboutQuery).catch(err => {
        console.warn('Failed to fetch about:', err.message);
        return null;
      }),
      client.fetch(allBlogPostsQuery).catch(err => {
        console.warn('Failed to fetch blog posts:', err.message);
        return [];
      }),
      client.fetch(resumeQuery).catch(err => {
        console.warn('Failed to fetch resume:', err.message);
        return null;
      }),
      client.fetch(siteSettingsQuery).catch(err => {
        console.warn('Failed to fetch site settings:', err.message);
        return null;
      }),
    ]);

    // Write data to JSON files
    writeFileSync(join(outputDir, 'home.json'), JSON.stringify(home, null, 2));
    writeFileSync(join(outputDir, 'about.json'), JSON.stringify(about, null, 2));
    writeFileSync(join(outputDir, 'blogPosts.json'), JSON.stringify(blogPosts, null, 2));
    writeFileSync(join(outputDir, 'resume.json'), JSON.stringify(resume, null, 2));
    writeFileSync(join(outputDir, 'siteSettings.json'), JSON.stringify(siteSettings, null, 2));

    // Fetch individual blog post content for each post
    if (blogPosts && Array.isArray(blogPosts)) {
      console.log(`Fetching content for ${blogPosts.length} blog posts...`);
      for (const post of blogPosts) {
        const slug = post.slug?.current;
        if (slug) {
          try {
            const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
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
            const postData = await client.fetch(blogPostQuery, { slug });
            if (postData) {
              writeFileSync(join(blogPostsDir, `${slug}.json`), JSON.stringify(postData, null, 2));
            }
          } catch (err) {
            console.warn(`Failed to fetch blog post ${slug}:`, err.message);
          }
        }
      }
    }

    console.log('✅ CMS data fetched and saved successfully!');
    console.log(`   - Home: ${home ? '✓' : '✗'}`);
    console.log(`   - About: ${about ? '✓' : '✗'}`);
    console.log(`   - Blog Posts: ${blogPosts.length} posts`);
    console.log(`   - Resume: ${resume ? '✓' : '✗'}`);
    console.log(`   - Site Settings: ${siteSettings ? '✓' : '✗'}`);
  } catch (error) {
    console.error('Error fetching CMS data:', error);
    process.exit(1);
  }
}

fetchData();
