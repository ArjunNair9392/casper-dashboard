/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        API_KEY: process.env.API_KEY
    }
};

module.exports = nextConfig;
