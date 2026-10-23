import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Extra hostnames allowed to use the dev server (HMR, dev assets), e.g. over Tailscale.
  // Comma-separated, set in .env.local.
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
