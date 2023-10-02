/** @type {import('next').NextConfig} */
// import { withContentlayer } from 'next-contentlayer';
import './env.mjs';

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
  swcMinify: true,

  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },

  // Uncoment to add domain whitelist
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.suara.com',
        port: '',
        pathname: '/pictures/**',
      },
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
