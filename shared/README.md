# Shared Package

The shared package contains common utilities, types, and constants used across both frontend and backend applications.

## 🛠️ Tech Stack

- **TypeScript**: Type-safe development
- **Zod**: Schema validation and type inference
- **Jest**: Testing framework

## 📁 Directory Structure

```
shared/
├── types/               # TypeScript type definitions
│   ├── api.ts          # API request/response types
│   ├── user.ts         # User-related types
│   └── index.ts        # Type exports
├── utils/              # Utility functions
│   ├── validation.ts   # Validation helpers
│   ├── formatting.ts   # Data formatting utilities
│   └── index.ts        # Utility exports
├── constants/          # Shared constants
│   ├── api.ts          # API endpoints and status codes
│   ├── errors.ts       # Error messages
│   └── index.ts        # Constant exports
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Installation
```bash
cd shared
npm install
```

### Building
```bash
npm run build          # Compile TypeScript to dist/
npm run dev            # Watch mode for development
```

## 📜 Available Scripts

```bash
# Development
npm run build          # Compile TypeScript
npm run dev            # Watch mode compilation
npm run clean          # Clean build artifacts

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run type-check     # Run TypeScript compiler check

# Testing
npm run test           # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
```

## 🔧 Usage

### In Frontend (Next.js)
```typescript
// Import shared types
import { User, ApiResponse } from '@/shared/types';
import { API_ENDPOINTS } from '@/shared/constants';
import { validateEmail } from '@/shared/utils';

// Use in components
const UserProfile: FC<{ user: User }> = ({ user }) => {
  // Component implementation
};
```

### In Backend (Express.js)
```typescript
// Import shared types
import { User, CreateUserRequest } from '@/shared/types';
import { ERROR_MESSAGES } from '@/shared/constants';
import { validateEmail } from '@/shared/utils';

// Use in controllers
export const createUser = async (req: CreateUserRequest, res: Response) => {
  // Controller implementation
};
```

## 📝 Type Definitions

### User Types
```typescript
// types/user.ts
export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  profile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  bio?: string;
  avatar?: string;
  userId: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
```

### API Types
```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}
```

## 🛠️ Utility Functions

### Validation Utilities
```typescript
// utils/validation.ts
import { z } from 'zod';

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/);
export const usernameSchema = z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/);

export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const validatePassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success;
};

export const validateUsername = (username: string): boolean => {
  return usernameSchema.safeParse(username).success;
};

// User registration schema
export const userRegistrationSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
```

### Formatting Utilities
```typescript
// utils/formatting.ts
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
```

## 📋 Constants

### API Constants
```typescript
// constants/api.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`
  }
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
```

### Error Constants
```typescript
// constants/errors.ts
export const ERROR_MESSAGES = {
  VALIDATION: {
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    INVALID_USERNAME: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
    REQUIRED_FIELD: 'This field is required'
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_EXPIRED: 'Your session has expired. Please log in again',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    USER_NOT_FOUND: 'User not found'
  },
  SERVER: {
    INTERNAL_ERROR: 'An internal server error occurred',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable'
  }
} as const;
```

## 🧪 Testing

### Test Examples
```typescript
// __tests__/validation.test.ts
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      expect(validatePassword('TestPass123')).toBe(true);
    });

    it('should reject weak password', () => {
      expect(validatePassword('weak')).toBe(false);
    });
  });
});
```

## 📦 Publishing

### Build and Export
```typescript
// index.ts
export * from './types';
export * from './utils';
export * from './constants';
```

### Package.json Configuration
```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ]
}
```

## 🔄 Integration

### Frontend Integration
```typescript
// In Next.js tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/shared/*": ["../shared/*"]
    }
  }
}
```

### Backend Integration
```typescript
// In Express tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/shared/*": ["../shared/*"]
    }
  }
}
```

## 📝 Best Practices

1. **Type Safety**
   - Use strict TypeScript configuration
   - Leverage Zod for runtime validation
   - Export all types from index files

2. **Code Organization**
   - Keep utilities pure and testable
   - Group related constants together
   - Use consistent naming conventions

3. **Testing**
   - Test all utility functions
   - Validate schema definitions
   - Mock external dependencies

4. **Documentation**
   - Document complex utility functions
   - Provide usage examples
   - Keep README updated
