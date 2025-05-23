/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg", "images.unsplash.com"],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Handle Prisma in browser issue
    if (!isServer) {
      // Replace any direct Prisma imports with empty modules
      config.resolve.alias = {
        ...config.resolve.alias,
        ".prisma/client/index-browser": false,
        ".prisma/client": false,
        "@prisma/client/runtime": false,
        "@prisma/client": false,
      }
    }

    return config
  },
}

module.exports = nextConfig
