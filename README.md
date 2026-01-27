# Portfolio Website

A modern portfolio website built with Next.js and Sanity CMS.

## Project Structure

```
├── frontend/          # Next.js website
│   ├── app/           # Pages and layouts
│   ├── components/    # React components
│   └── lib/sanity/    # Sanity client and queries
│
├── backend/           # Sanity Studio (CMS)
│   └── schemas/       # Content schemas
│
└── vercel.json        # Deployment config
```

## Getting Started

### 1. Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create new project"
3. Name it (e.g., "My Portfolio")
4. Copy your **Project ID**

### 2. Set Up Environment Variables

Copy the example env files:

```bash
# Root
cp .env.example .env.local

# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

Fill in your Sanity Project ID in each file.

### 3. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install individually
cd frontend && npm install
cd ../backend && npm install
```

### 4. Run the Development Servers

```bash
# Run the frontend (website)
npm run dev

# In another terminal, run the backend (CMS)
npm run dev:studio
```

- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## Editing Content

### For Non-Developers

1. Open Sanity Studio at http://localhost:3333
2. Use the sidebar to navigate sections:
   - **Site Settings** - Website title and SEO
   - **Hero Section** - Your name and intro
   - **Work Experience** - Your job history
   - **Projects** - Portfolio pieces
   - **Blog Posts** - Articles and thoughts
   - **Contact** - Email and social links

### Content Sections

| Section | Description |
|---------|-------------|
| Site Settings | Global site title, description, and branding |
| Hero | Main landing intro with your name |
| Work Experience | List of jobs (company, role, dates) |
| Projects | Portfolio pieces with images and links |
| Blog Posts | Articles for the Mindspace section |
| Contact | Email and social media links |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Deploy!

### Deploy Sanity Studio

```bash
cd backend
pnpm deploy
```

This hosts your CMS at `your-project.sanity.studio`.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **CMS**: Sanity v3
- **UI Components**: shadcn/ui, Radix UI
- **Deployment**: Vercel
