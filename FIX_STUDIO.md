# Fix: Studio Only Showing Releases Page

## Quick Fix Steps

### 1. Stop the Studio
Press `Ctrl+C` in the terminal where the studio is running.

### 2. Clear Cache
```bash
cd studio
rm -rf .sanity
rm -rf node_modules/.cache
```

### 3. Restart the Studio
```bash
npm run dev
```

### 4. Check the Terminal
Look for any error messages. You should see:
- Schema types being loaded
- No import errors
- Studio starting successfully

## What You Should See

After restarting, in the left sidebar you should see:
- ✅ **Home Page** - Click to edit homepage
- ✅ **About Page** - Click to edit about page  
- ✅ **Blog Post** - Click to create/edit posts
- ✅ **Resume** - Click to upload resume
- ✅ **Site Settings** - Click for global settings

## If Still Not Working

### Check Terminal for Errors
Look for messages like:
- "Cannot find module"
- "Schema validation error"
- TypeScript errors

### Verify Files Exist
```bash
cd studio
ls -la schemas/
```

You should see:
- `home.ts`
- `about.ts`
- `blogPost.ts`
- `resume.ts`
- `siteSettings.ts`
- `index.ts`

### Verify Config
The `studio/sanity.config.ts` should have:
```typescript
schema: {
  types: schemaTypes,
}
```

## Common Issues

1. **Studio not restarted** - Always restart after schema changes
2. **Cache issues** - Clear `.sanity` folder
3. **Import errors** - Check terminal for module resolution errors
4. **TypeScript errors** - Check terminal for compilation errors

## Still Having Issues?

Check the browser console (F12) for JavaScript errors and share them.
