import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mattyjacks.com' }],
        destination: 'https://mattyjacks.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
