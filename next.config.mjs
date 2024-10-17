import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
    dest: 'public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        return config;
    },
};

export default withPWAConfig(nextConfig);
