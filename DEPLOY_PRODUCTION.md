# Deploying to Production

Since your frontend is on GitHub Pages (static), you need to deploy the API server separately. Here are the best options:

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel automatically detects and deploys serverless functions from the `api/` folder.

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
- **Project name?** → kyw-portfolio-api (or any name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 3: Set Environment Variables
```bash
vercel env add VITE_SANITY_PROJECT_ID
# Enter: 29s0hb29

vercel env add VITE_SANITY_DATASET
# Enter: production
```

### Step 4: Get Your API URL
After deployment, Vercel will show you a URL like:
```
https://kyw-portfolio-api.vercel.app
```

### Step 5: Update Frontend
Add to your `.env` file (or GitHub Pages environment variables):
```bash
VITE_API_ROUTE=https://kyw-portfolio-api.vercel.app/api/sanity-proxy
```

Then rebuild and redeploy frontend:
```bash
npm run build
npm run deploy
```

---

## Option 2: Deploy Express Server to Railway (Full Control)

Railway can host your Express server.

### Step 1: Create `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Set environment variables:
   - `VITE_SANITY_PROJECT_ID=29s0hb29`
   - `VITE_SANITY_DATASET=production`
   - `PORT=3001` (Railway sets this automatically)

### Step 3: Get Your API URL
Railway will give you a URL like:
```
https://your-app.railway.app
```

### Step 4: Update Frontend
```bash
VITE_API_ROUTE=https://your-app.railway.app/api/sanity
```

---

## Option 3: Deploy Express Server to Render

### Step 1: Create `render.yaml`
```yaml
services:
  - type: web
    name: sanity-proxy
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: VITE_SANITY_PROJECT_ID
        value: 29s0hb29
      - key: VITE_SANITY_DATASET
        value: production
```

### Step 2: Deploy
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Render will auto-detect settings

---

## Quick Start: Vercel (Recommended)

**Fastest way to get production-ready:**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Set env vars
vercel env add VITE_SANITY_PROJECT_ID
vercel env add VITE_SANITY_DATASET

# 4. Get URL and update .env
# Vercel will show: https://your-project.vercel.app
# Add to .env: VITE_API_ROUTE=https://your-project.vercel.app/api/sanity-proxy

# 5. Rebuild frontend
npm run build
npm run deploy
```

That's it! Your API will be live and your frontend will use it automatically.
