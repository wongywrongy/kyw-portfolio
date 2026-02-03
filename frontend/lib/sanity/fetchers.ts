import { client } from './client'
import {
  heroQuery,
  workExperiencesQuery,
  projectsQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  siteSettingsQuery,
} from './queries'

export async function getHero() {
  return client.fetch(heroQuery)
}

export async function getWorkExperiences() {
  return client.fetch(workExperiencesQuery)
}

export async function getProjects() {
  return client.fetch(projectsQuery)
}

export async function getBlogPosts() {
  return client.fetch(blogPostsQuery)
}

export async function getBlogPost(slug: string) {
  return client.fetch(blogPostBySlugQuery, { slug })
}

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery)
}

// Fetch all homepage data at once
export async function getHomepageData() {
  const [hero, workExperiences, projects, blogPosts, siteSettings] = await Promise.all([
    getHero(),
    getWorkExperiences(),
    getProjects(),
    getBlogPosts(),
    getSiteSettings(),
  ])

  return { hero, workExperiences, projects, blogPosts, siteSettings }
}
