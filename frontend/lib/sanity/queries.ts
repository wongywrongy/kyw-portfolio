// ============================================
// SANITY QUERIES
// ============================================

// Hero section
export const heroQuery = `*[_type == "hero"][0]{
  greeting,
  name,
  tagline,
  email,
  linkedin,
  github
}`

// Work experiences (ordered)
export const workExperiencesQuery = `*[_type == "workExperience"] | order(order asc){
  _id,
  company,
  role,
  period,
  description
}`

// Projects (ordered)
export const projectsQuery = `*[_type == "project"] | order(order asc){
  _id,
  title,
  subtitle,
  description,
  link,
  tags
}`

// Blog posts for list (ordered) - includes content for word count
export const blogPostsQuery = `*[_type == "blogPost"] | order(order asc){
  _id,
  title,
  slug,
  date,
  excerpt,
  category,
  featuredImage,
  "wordCount": length(pt::text(content))
}`

// Single blog post by slug (with full content)
export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  date,
  excerpt,
  category,
  featuredImage,
  content,
  "wordCount": length(pt::text(content))
}`
