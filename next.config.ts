import type { NextConfig } from "next";

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
