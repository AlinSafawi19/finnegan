import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
    /** Allow `quality` values used on `<Image>` (Next 16 defaults to [75] only). */
    qualities: [75, 85, 90, 92],
    /** Prefer AVIF then WebP for better fidelity per byte vs WebP-only defaults. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
