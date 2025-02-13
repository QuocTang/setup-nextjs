import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eduzaa.api1.lamgigio.net",
      },
      {
        protocol: "https",
        hostname: "api.eduzaa.com",
      },
    ],
  },
};

export default nextConfig;
