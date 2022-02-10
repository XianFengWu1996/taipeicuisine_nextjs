/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.istockphoto.com', 'firebasestorage.googleapis.com'],
  }
}

module.exports = nextConfig
