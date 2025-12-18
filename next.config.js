/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farmaita.eu',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
