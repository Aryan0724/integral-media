import type { NextConfig } from "next"; // Trigger Build 123

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog.html',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
