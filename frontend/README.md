# Frontend - Next.js Application

The frontend is built with Next.js 14, React 18, and TypeScript, providing a modern and responsive user interface.

## 🛠️ Tech Stack

- **Next.js 14**: React framework with SSR/SSG capabilities
- **React 18**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Axios**: HTTP client for API communication

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── lib/             # Utility libraries and configurations
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles and CSS modules
├── public/              # Static assets (images, icons, etc.)
├── components/          # Additional component organization
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- NPM 9+

### Development Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API endpoints and keys
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at http://localhost:3000

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run export           # Export static files

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Run TypeScript compiler check

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report

# Utilities
npm run clean            # Clean build artifacts
```

## 🎨 Styling Guidelines

### Tailwind CSS
- Use Tailwind utility classes for styling
- Create custom components for repeated patterns
- Utilize responsive design utilities
- Follow mobile-first approach

### Component Structure
```tsx
// Example component structure
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const Component: FC<ComponentProps> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
};
```

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path mapping configured for clean imports
- Shared types from `@/shared/*`

### ESLint
- Next.js recommended rules
- React hooks rules
- TypeScript-specific rules
- Prettier integration

### Testing
- Jest with React Testing Library
- JSDOM environment for browser APIs
- Coverage reporting enabled

## 🌐 API Integration

### HTTP Client Setup
```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 10000,
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Misogyu Web App
```

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

### Mobile-First Approach
```tsx
// Example responsive component
<div className="
  w-full 
  px-4 sm:px-6 lg:px-8
  py-4 md:py-6 lg:py-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  {/* Content */}
</div>
```

## 🧪 Testing Strategy

### Unit Tests
- Test individual components in isolation
- Mock external dependencies
- Focus on component behavior and props

### Integration Tests
- Test component interactions
- Test API integration points
- Test user workflows

### Example Test
```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test content</Component>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Build Process
```bash
npm run build    # Creates optimized production build
npm run start    # Serves production build
```

### Static Export (Optional)
```bash
npm run export   # Generates static files for CDN deployment
```

### Environment Configuration
- Set production environment variables
- Configure API endpoints
- Set up analytics and monitoring

## 📝 Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement proper error boundaries

2. **State Management**
   - Use React hooks for local state
   - Consider Zustand/Redux for global state
   - Implement proper loading and error states

3. **Performance**
   - Use Next.js Image component for images
   - Implement code splitting with dynamic imports
   - Optimize bundle size with proper imports

4. **Accessibility**
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation support

5. **SEO**
   - Use Next.js Head component for meta tags
   - Implement proper page titles and descriptions
   - Use structured data where appropriate
