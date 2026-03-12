/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'picsum.photos', 'api.dicebear.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['three'],
  },
}

module.exports = withPWA(nextConfig)
