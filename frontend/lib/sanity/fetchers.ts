import { client } from './client'
import {
  heroQuery,
  workExperiencesQuery,
  projectsQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
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

// Fetch all homepage data at once
export async function getHomepageData() {
  const [hero, workExperiences, projects, blogPosts] = await Promise.all([
    getHero(),
    getWorkExperiences(),
    getProjects(),
    getBlogPosts(),
  ])
  
  return { hero, workExperiences, projects, blogPosts }
}
