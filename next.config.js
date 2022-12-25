/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mouhtada.allcine227.com',
        pathname: '/storage/**',
      },
    ],
  },

}
