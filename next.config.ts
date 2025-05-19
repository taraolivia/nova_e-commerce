import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['static.noroff.dev'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;