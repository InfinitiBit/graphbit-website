/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Build optimizations to reduce build time
  experimental: {
    // Optimize build performance
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Reduce build time by limiting concurrent operations
  swcMinify: true,
  // Optimize image handling for static export
  images: {
    unoptimized: true,
  },
  // Reduce memory usage during build
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize for production builds
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
