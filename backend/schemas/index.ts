// ============================================
// SCHEMA INDEX
// ============================================
// Each schema represents a section of your portfolio.
//
// SECTIONS:
// 1. Site Settings - Global site configuration
// 2. Hero - Landing section with name and contact links
// 3. Work Experience - Your job history
// 4. Projects - Portfolio projects
// 5. Blog Posts - Mindspace articles
// ============================================

import siteSettings from './siteSettings'
import hero from './hero'
import workExperience from './workExperience'
import project from './project'
import blogPost from './blogPost'

export const schemaTypes = [
  siteSettings,
  hero,
  workExperience,
  project,
  blogPost,
]
