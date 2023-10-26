/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
// import { withContentlayer } from 'next-contentlayer';
const { withAmplify } = require('@aws-amplify/adapter-nextjs/with-amplify');
const config = require('./src/amplifyconfiguration.json');
const env = require('./env.js');

const nextConfig = {
  env: env,
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
  swcMinify: true,

  experimental: {
    appDir: true,
    serverActions: true,
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

module.exports = withAmplify(nextConfig, config);
