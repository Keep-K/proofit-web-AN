/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
}

module.exports = nextConfig

