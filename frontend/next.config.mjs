// Two builds from one codebase:
//
// - The public site (default): a static export, served by nginx.
// - The editor (EDITOR=1): a normal Next server that also serves /keystatic and
//   its API route. Those routes live in *.editor.tsx / *.editor.ts files, which
//   only count as routes when `editor.*` is in pageExtensions, so the static
//   export never sees them.
const editor = process.env.EDITOR === '1'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: editor ? undefined : 'export',
  pageExtensions: editor ? ['editor.tsx', 'editor.ts', 'tsx', 'ts'] : ['tsx', 'ts'],
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: { root: import.meta.dirname },
}

export default nextConfig
