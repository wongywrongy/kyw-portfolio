module.exports = {
  projects: [
    {
      displayName: 'frontend',
      testMatch: ['<rootDir>/frontend/**/*.test.{js,ts,tsx}'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/frontend/jest.setup.js'],
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/frontend/$1',
        '^@/shared/(.*)$': '<rootDir>/shared/$1',
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      collectCoverageFrom: [
        'frontend/**/*.{ts,tsx}',
        '!frontend/**/*.d.ts',
        '!frontend/.next/**',
      ],
    },
    {
      displayName: 'backend',
      testMatch: ['<rootDir>/backend/**/*.test.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/backend/src/$1',
        '^@/shared/(.*)$': '<rootDir>/shared/$1',
      },
      collectCoverageFrom: [
        'backend/src/**/*.ts',
        'backend/routes/**/*.ts',
        'backend/models/**/*.ts',
        'backend/middleware/**/*.ts',
        '!backend/**/*.d.ts',
        '!backend/dist/**',
      ],
    },
    {
      displayName: 'shared',
      testMatch: ['<rootDir>/shared/**/*.test.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/shared/$1',
      },
      collectCoverageFrom: [
        'shared/**/*.ts',
        '!shared/**/*.d.ts',
        '!shared/dist/**',
      ],
    },
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/.next/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
