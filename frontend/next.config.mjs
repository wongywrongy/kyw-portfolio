/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: { root: import.meta.dirname },
}

export default nextConfig
