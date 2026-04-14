
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/portfolio-3fa01', // This ensures CSS/JS paths include the repo name
};
export default nextConfig;
