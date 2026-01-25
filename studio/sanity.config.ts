/**
 * Sanity Studio Configuration
 * 
 * This configures the Sanity Studio to use your schemas.
 * Run: npm run dev in the studio folder to start the CMS editor.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'portfolio',
  title: 'Personal Website CMS',
  projectId: '29s0hb29',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
