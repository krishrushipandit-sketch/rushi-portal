import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: { position: 'bottom-right' },
  // The on-disk dev cache kept serving stale CSS after edits/builds on this machine
  experimental: { turbopackFileSystemCacheForDev: false },
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'http', hostname: '72.61.228.175' },
    ],
  },
  // Allow server-side pg connections
  serverExternalPackages: ['pg', 'bcryptjs'],
}

export default nextConfig
