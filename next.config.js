/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:[process.env.STRIPY_ASSET_BASE_URL]
  }
}

module.exports = nextConfig
