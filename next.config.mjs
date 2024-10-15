import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
    dest: 'public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWAConfig(nextConfig);
