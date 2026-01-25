/**
 * Sanity Schema Index
 * 
 * This file exports all schemas for the Sanity CMS.
 * Add new schemas here when you create them.
 */

import home from './home';
import about from './about';
import blogPost from './blogPost';
import resume from './resume';
import siteSettings from './siteSettings';

export const schemaTypes = [home, about, blogPost, resume, siteSettings];
