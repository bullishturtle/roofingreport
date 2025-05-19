/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Simplified configuration to avoid build issues
  experimental: {
    serverActions: true,
  },
  // Disable webpack optimization to help identify issues
  webpack: (config) => {
    config.optimization.minimize = false
    return config
  },
}

module.exports = nextConfig
