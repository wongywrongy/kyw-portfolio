# Fixing Sanity Studio - Only Seeing Releases Page

## The Problem
If you're only seeing a "Releases" page in Sanity Studio and no content types (Home Page, About Page, Blog Post, etc.), the schemas aren't loading properly.

## Solution

### 1. Restart the Studio
**Important**: After any schema changes, you MUST restart the studio:

```bash
# Stop the current studio (Ctrl+C)
# Then restart:
cd studio
npm run dev
```

### 2. Verify Schema Files
The schemas should be in `studio/schemas/`:
- `home.ts`
- `about.ts`
- `blogPost.ts`
- `resume.ts`
- `siteSettings.ts`
- `index.ts`

### 3. Check the Config
The `studio/sanity.config.ts` should have:
```typescript
import { schemaTypes } from './schemas';

export default defineConfig({
  schema: {
    types: schemaTypes,
  },
});
```

### 4. Check for Errors
Look in your terminal where the studio is running for any errors like:
- Import errors
- Schema validation errors
- TypeScript compilation errors

### 5. Clear Cache (if needed)
```bash
cd studio
rm -rf .sanity
rm -rf node_modules/.cache
npm run dev
```

## What Should You See?

After restarting, you should see in the left sidebar:
- **Home Page** - Edit homepage content
- **About Page** - Edit about page
- **Blog Post** - Create/edit blog posts
- **Resume** - Upload and manage resume
- **Site Settings** - Global site settings

If you still only see "Releases", check the terminal for error messages.

## Common Issues

1. **Schemas not in studio folder**: They must be in `studio/schemas/`
2. **Import path wrong**: Should be `'./schemas'` not `'../sanity/schemas'`
3. **Studio not restarted**: Always restart after schema changes
4. **TypeScript errors**: Check terminal for compilation errors
