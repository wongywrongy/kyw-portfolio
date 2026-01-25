# Deploying the Sanity Proxy for Production

This guide explains how to deploy the serverless proxy function for production use.

## Quick Start: Deploy to Vercel (Recommended - 5 minutes)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd /Users/kylewong/Documents/Cursor/kyw-portfolio
vercel
```

When prompted:
- **Link to existing project?** → No (create new)
- **Project name?** → kyw-portfolio-proxy (or any name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 3: Set Environment Variables
After deployment, run:
```bash
vercel env add VITE_SANITY_PROJECT_ID
# Enter: 29s0hb29

vercel env add VITE_SANITY_DATASET  
# Enter: production
```

### Step 4: Get Your Proxy URL
After deployment, Vercel will show you a URL like:
```
https://kyw-portfolio-proxy.vercel.app
```

### Step 5: Update Frontend Configuration
Add to your `.env` file (or set in GitHub Pages environment variables):
```bash
VITE_PROXY_URL=https://kyw-portfolio-proxy.vercel.app/api/sanity-proxy
```

Then rebuild and redeploy your frontend:
```bash
npm run build
npm run deploy
```

## Option 2: Deploy to Netlify

### Step 1: Create `netlify/functions/sanity-proxy.ts`
Copy the function from `api/sanity-proxy.ts` to `netlify/functions/sanity-proxy.ts`

### Step 2: Install Netlify CLI
```bash
npm i -g netlify-cli
```

### Step 3: Deploy
```bash
netlify deploy --prod
```

## Option 3: Use with GitHub Pages + Separate Proxy

Since GitHub Pages is static-only, you'll need to:

1. Deploy the proxy function separately (Vercel/Netlify)
2. Update `VITE_PROXY_URL` to point to your deployed proxy
3. Rebuild and redeploy your frontend

## Testing the Proxy

Once deployed, test the proxy:
```bash
curl "https://your-proxy-url/api/sanity-proxy?query=*[_type == \"home\"][0]"
```

## Environment Variables

Make sure these are set in your deployment platform:
- `VITE_SANITY_PROJECT_ID` (or hardcoded in the function)
- `VITE_SANITY_DATASET` (or hardcoded in the function)

## Current Setup

The code is configured to:
- Use `/api/sanity-proxy` in production (your own serverless function)
- Fall back to `corsproxy.io` in development

This means once you deploy the proxy function, it will automatically be used in production builds.
