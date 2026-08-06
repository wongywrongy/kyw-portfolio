import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
})

// Generated files: Payload rewrites payload-types.ts and the (payload) route
// group, and Next owns next-env.d.ts.
const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      'payload-types.ts',
      'app/(payload)/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default config
