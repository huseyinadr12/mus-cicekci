import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_PUBLIC_PAGES_DEMO === "true" ? {
    output: "export" as const,
    basePath: "/mus-cicekci",
    trailingSlash: true,
    turbopack: { root: process.env.PAGES_WORKSPACE_ROOT || process.cwd() },
  } : {}),
  images: {
    unoptimized: process.env.NEXT_PUBLIC_PAGES_DEMO === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.muscicekci.net",
      },
      {
        protocol: "https",
        hostname: "muscicekci.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
