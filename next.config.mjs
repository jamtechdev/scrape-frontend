/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure proper routing for static export
  trailingSlash: false,
};

export default nextConfig;
