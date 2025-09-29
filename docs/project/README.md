# Misogyu Web Development Project

A full-stack web application built with Next.js frontend and Express.js backend, featuring a modular monorepo architecture.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express Validator
- **Logging**: Winston

### Development
- **Package Manager**: NPM Workspaces
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest with coverage reporting
- **Build Tool**: TypeScript compiler

## 📁 Project Structure

```
misogyu-webdev/
├── frontend/              # Next.js frontend application
│   ├── src/              # Source code
│   ├── components/       # React components
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
├── backend/              # Express.js backend application
│   ├── src/             # Source code
│   ├── routes/          # API routes
│   ├── models/          # Data models
│   ├── middleware/      # Express middleware
│   └── package.json     # Backend dependencies
├── shared/              # Shared utilities and types
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── constants/       # Shared constants
│   └── package.json     # Shared dependencies
├── docs/project/        # Project documentation
├── scripts/             # Build and deployment scripts
└── package.json         # Root workspace configuration
```

## 🛠️ Development Setup

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **NPM**: Version 9.0.0 or higher
- **Git**: For version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/wongywrongy/kyw-portfolio.git
   cd kyw-portfolio
   git checkout dev2
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database and API keys
   
   # Frontend environment (if needed)
   cp frontend/.env.local.example frontend/.env.local
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
