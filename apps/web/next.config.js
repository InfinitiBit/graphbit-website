/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Build optimizations to reduce build time
  experimental: {
    // Optimize build performance
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    // Enable partial prerendering for better SSR/SSG performance
    ppr: false, // Disable for now to avoid breaking changes
    // Optimize server-side rendering
    serverMinification: true,
  },
  // SWC minification is enabled by default in Next.js 13+
  // Optimize image handling for static export
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable compression
  compress: true,
  // Power-up headers for performance
  poweredByHeader: false,
  // Static optimization
  generateEtags: true,
  // Reduce memory usage during build
  webpack: (config, { dev, isServer }) => {
    // Handle Three.js and client-only libraries for SSR
    if (isServer) {
      config.externals = [...(config.externals || []), 'three', '@react-three/fiber', '@react-three/drei'];
    }
    
    // Optimize for production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: (module) => {
                // Include node_modules but exclude Three.js and other problematic libraries
                return (
                  module.context &&
                  module.context.includes('node_modules') &&
                  !module.context.includes('three') &&
                  !module.context.includes('@react-three')
                );
              },
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      };
    }
    
    // Optimize bundle size and handle lodash imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Handle lodash imports
      'lodash/isEqual': 'lodash-es/isEqual',
      'lodash/isNil': 'lodash-es/isNil',
      'lodash/isFunction': 'lodash-es/isFunction',
      'lodash/range': 'lodash-es/range',
    };
    
    return config;
  },
  // Headers for performance
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
