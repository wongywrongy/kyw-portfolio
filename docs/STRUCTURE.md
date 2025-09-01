# Project Structure Proposal

This document proposes a clear directory structure for maintainability, scalability, and discoverability. No files have been moved; this is a guide for future organization.

## Top-level
- `src/`: Application source
- `public/`: Public static assets
- `content/`: MDX/markdown content (non-compiled)
- `docs/`: Documentation for devs

## Suggested src/ layout
- `src/pages/`
  - Route-level components only (no heavy logic)
  - Keep page-specific layout and composition here
- `src/components/`
  - Reusable, presentation-focused components
  - Consider sub-folders:
    - `layout/` (wrappers, grids, headers)
    - `mdx/` (MDX provider, typography helpers)
    - `media/` (images, figures, grids)
    - `ui/` (buttons, inputs, badges)
- `src/contexts/`
  - React Context providers (e.g., Theme)
- `src/hooks/`
  - Reusable hooks (e.g., `useIntersection`, `useScrollParallax`)
- `src/lib/` or `src/utils/`
  - Pure helpers and utilities (formatters, parsers, constants)
- `src/styles/`
  - Global CSS, Tailwind config helpers, design tokens
- `src/types/`
  - Shared TypeScript types/interfaces
- `src/content/`
  - TypeScript-backed content maps (indexes, metadata)

## Naming conventions
- Components: `PascalCase.tsx`
- Hooks: `use<Thing>.ts`
- Utilities: `camelCase.ts`
- Contexts: `<Thing>Context.tsx`
- Pages: `PascalCase.tsx`

## Co-location guidelines
- If a component has tight-coupled helpers/types, co-locate in a folder:
  - `ComponentName/index.tsx`
  - `ComponentName/types.ts`
  - `ComponentName/styles.css` (or module)

## Barrels (optional)
- Use `index.ts` re-exports in directories with many items to simplify imports.

## MDX content
- Keep authored content in top-level `content/`
- Curated/typed content indices in `src/content/`
- Prefer slug-based folders: `content/blog/<slug>.mdx`

## Assets
- Public assets in `public/`
- Component-local assets should be imported and bundled via Vite (placed near component or in `src/assets/`).

## Migration suggestions (incremental)
- Introduce `src/hooks/` and move custom hooks gradually
- Introduce `src/utils/` for shared helpers
- Split `src/components/` into the suggested sub-groups over time
- Add `src/types/` for shared interfaces as they emerge

## Quality
- Keep components small and focused
- Prefer composition over prop bloat
- Document complex logic with concise comments
- Maintain consistent Tailwind patterns (spacing, colors, typography)
