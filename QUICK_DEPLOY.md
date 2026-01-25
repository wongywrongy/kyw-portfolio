# Quick Production Deployment Guide

## Deploy API to Vercel (5 minutes)

### Step 1: Install & Deploy
```bash
npm i -g vercel
vercel
```

When prompted:
- **Link to existing project?** → **No**
- **Project name?** → **kyw-portfolio-api** (or any name)
- **Directory?** → **./** (press Enter)
- **Override settings?** → **No**

### Step 2: Set Environment Variables
```bash
vercel env add VITE_SANITY_PROJECT_ID production
# Enter: 29s0hb29

vercel env add VITE_SANITY_DATASET production
# Enter: production
```

### Step 3: Get Your API URL
After deployment, Vercel will show:
```
✅ Production: https://kyw-portfolio-api.vercel.app
```

### Step 4: Update Frontend
Add to your `.env` file:
```bash
VITE_API_ROUTE=https://kyw-portfolio-api.vercel.app/api/sanity-proxy
```

### Step 5: Rebuild & Deploy Frontend
```bash
npm run build
npm run deploy
```

**Done!** Your site is now live with the API working.

---

## Alternative: Deploy Express Server to Railway

If you prefer the Express server:

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Railway auto-detects `server.js`
5. Set env vars:
   - `VITE_SANITY_PROJECT_ID=29s0hb29`
   - `VITE_SANITY_DATASET=production`
6. Get URL and update `.env`:
   ```bash
   VITE_API_ROUTE=https://your-app.railway.app/api/sanity
   ```
