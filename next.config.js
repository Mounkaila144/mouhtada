/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    loader: "akamai",
    path: "/",
    protocol: 'https',
    hostname: 'mouhtada.allcine227.com',
    pathname: '/storage/**'
  }
}

module.exports = nextConfig
