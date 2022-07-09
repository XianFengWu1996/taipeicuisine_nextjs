/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.istockphoto.com', 'firebasestorage.googleapis.com'],
  },
  eslint:{
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
