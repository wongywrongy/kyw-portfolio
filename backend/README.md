# Backend - Express.js API

The backend is built with Express.js, TypeScript, and Prisma ORM, providing a robust and scalable API foundation.

## 🛠️ Tech Stack

- **Express.js**: Fast and minimal web framework
- **TypeScript**: Type-safe JavaScript development
- **Prisma**: Modern database toolkit and ORM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Winston**: Logging library
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Express Validator**: Input validation and sanitization

## 📁 Directory Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── services/        # Business logic layer
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── server.ts       # Application entry point
├── routes/             # API route definitions
├── models/             # Database models (Prisma)
├── middleware/         # Express middleware
├── prisma/             # Database schema and migrations
├── tests/              # Test files
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- NPM 9+
- PostgreSQL/MySQL/SQLite (depending on your choice)

### Development Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database and API keys
   ```

3. **Set up the database**
   ```bash
   npm run db:generate    # Generate Prisma client
   npm run db:migrate     # Run database migrations
   npm run db:seed        # Seed with sample data
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The API will be available at http://localhost:5000

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server with nodemon
npm run build            # Compile TypeScript to JavaScript
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset database

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Run TypeScript compiler check

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:integration # Run integration tests

# Utilities
npm run clean            # Clean build artifacts
```

## 🗃️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  role      Role     @default(USER)
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id       String  @id @default(cuid())
  bio      String?
  avatar   String?
  user     User    @relation(fields: [userId], references: [id])
  userId   String  @unique
}

enum Role {
  USER
  ADMIN
}
```

## 🛡️ Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Token refresh mechanism
- Role-based access control (RBAC)

### Security Middleware
```typescript
// Security setup
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

### Input Validation
```typescript
import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('username').isLength({ min: 3, max: 20 }).isAlphanumeric(),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

## 🔧 API Routes

### Authentication Routes
```typescript
// /auth
POST   /auth/register    # User registration
POST   /auth/login       # User login
POST   /auth/refresh     # Refresh tokens
POST   /auth/logout      # User logout
GET    /auth/profile     # Get user profile
PUT    /auth/profile     # Update user profile
```

### User Routes
```typescript
// /users
GET    /users           # Get all users (admin only)
GET    /users/:id       # Get user by ID
PUT    /users/:id       # Update user
DELETE /users/:id       # Delete user (admin only)
```

### Example Route Implementation
```typescript
// routes/auth.ts
import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateUser } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', validateUser, AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;
```

## 🧪 Testing Strategy

### Unit Tests
- Test individual functions and methods
- Mock database calls and external services
- Focus on business logic validation

### Integration Tests
- Test complete API endpoints
- Test database interactions
- Test authentication flows

### Example Test
```typescript
import request from 'supertest';
import app from '../src/server';
import { prisma } from '../src/lib/prisma';

describe('Auth Routes', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'TestPassword123'
    };

    const response = await request(app)
      .post('/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.token).toBeDefined();
  });
});
```

## 📊 Logging

### Winston Configuration
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

## 🌍 Environment Variables

```bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
FRONTEND_URL="http://localhost:3000"
PORT=5000
NODE_ENV="development"

# Email configuration (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File upload (optional)
UPLOAD_PATH="./uploads"
MAX_FILE_SIZE=5242880  # 5MB
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY prisma ./prisma
RUN npx prisma generate
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Best Practices

1. **Error Handling**
   - Use async/await with try-catch blocks
   - Implement global error handler middleware
   - Return consistent error responses

2. **Database**
   - Use Prisma migrations for schema changes
   - Implement proper indexing for performance
   - Use transactions for data consistency

3. **Security**
   - Validate and sanitize all inputs
   - Implement rate limiting
   - Use HTTPS in production
   - Keep dependencies updated

4. **Performance**
   - Implement caching where appropriate
   - Use database connection pooling
   - Optimize database queries
   - Implement pagination for large datasets

5. **Monitoring**
   - Log all errors and important events
   - Monitor API response times
   - Track database performance
   - Set up health check endpoints
