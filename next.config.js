/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    // reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: `http://172.25.32.1:8080/:path*`,
        },
      ];
    },
  };

module.exports = nextConfig;