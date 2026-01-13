/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export for PM2 server deployment
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
