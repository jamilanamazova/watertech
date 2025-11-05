/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'via.placeholder.com', 'ui-avatars.com'],
  },
}

module.exports = nextConfig
