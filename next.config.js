/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        formats: ['image/png'],
        protocol: 'https',
        hostname: 'mouhtada.allcine227.com',
      },
    ],
  },

}
