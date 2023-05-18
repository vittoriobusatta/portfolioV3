/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    unoptimized: true,
  },
  output: 'export',
};

module.exports = nextConfig;
