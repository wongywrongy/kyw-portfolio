# Production Deployment Checklist

## ✅ Sanity CMS Configuration

### Environment Variables
- [x] `VITE_SANITY_PROJECT_ID` - Set in `.env` file
- [x] `VITE_SANITY_DATASET` - Set to `production`
- [ ] `VITE_SANITY_TOKEN` - Optional but recommended (read token)

### Client Configuration
- [x] Using Sanity CDN (`useCdn: true`) - No CORS needed
- [x] API version set to `2024-01-01`
- [x] Perspective set to `published` (production-ready)
- [x] Parameterized queries to prevent injection attacks
- [x] Image URL builder configured for CDN

### Security
- [x] No CORS configuration needed (Sanity CDN handles this)
- [x] Queries use parameterized values (prevents injection)
- [x] Only published content fetched in production
- [ ] Optional: Add read token for additional security

## 📦 Build Configuration

### Before Building
1. **Set Environment Variables**:
   ```bash
   # .env file should contain:
   VITE_SANITY_PROJECT_ID=29s0hb29
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=your-token-here  # Optional but recommended
   ```

2. **Verify Content in Sanity**:
   - Create all required documents:
     - Home Page
     - About Page
     - Site Settings (optional)
     - Resume (optional)
     - Blog Posts (optional)

3. **Test Locally**:
   ```bash
   npm run build
   npm run preview
   ```

### Build Command
```bash
npm run build
```

This will:
- Compile TypeScript
- Bundle assets
- Optimize images
- Generate production-ready files in `dist/`

## 🚀 Deployment Steps

### 1. Environment Setup
- Ensure `.env` file has production values
- **DO NOT** commit `.env` to git (already in `.gitignore`)
- Set environment variables in your hosting platform

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy
- Deploy the `dist/` folder to your hosting platform
- Common platforms:
  - **Vercel**: Auto-detects Vite, just push to git
  - **Netlify**: Deploy `dist/` folder
  - **GitHub Pages**: Use `npm run deploy`

### 4. Environment Variables on Hosting Platform
Set these in your hosting platform's environment variables:
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_TOKEN` (optional)

## 🔒 Security Best Practices

### Sanity Token (Recommended)
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Viewer** permissions
5. Add to `.env` as `VITE_SANITY_TOKEN`
6. Add to hosting platform environment variables

### Why Use a Token?
- Prevents unauthorized access
- Allows rate limiting
- Better security for production

## ✅ Production Readiness Checklist

- [x] Sanity client configured with CDN (no CORS needed)
- [x] Queries are parameterized (secure)
- [x] Only published content fetched
- [x] Image URLs use CDN
- [x] Error handling in hooks
- [x] Environment variables documented
- [ ] Content created in Sanity Studio
- [ ] Read token added (optional but recommended)
- [ ] Tested build locally
- [ ] Environment variables set on hosting platform

## 🐛 Troubleshooting

### Content Not Loading?
- Check browser console for errors
- Verify environment variables are set
- Check that content exists in Sanity Studio
- Verify dataset name matches

### Images Not Showing?
- Ensure images are uploaded to Sanity (not just referenced)
- Check image URLs in network tab
- Verify CDN is accessible

### Build Errors?
- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Check that all schemas are properly exported

## 📝 Notes

- **No CORS Configuration Needed**: Sanity CDN automatically handles cross-origin requests
- **CDN Benefits**: Faster loading, cached responses, global distribution
- **Production Perspective**: Only fetches published content, not drafts
- **Parameterized Queries**: Prevents injection attacks, more secure

## 🔗 Useful Links

- Sanity Dashboard: https://www.sanity.io/manage
- Sanity Docs: https://www.sanity.io/docs
- Project ID: `29s0hb29` (Personal Website CMS)
