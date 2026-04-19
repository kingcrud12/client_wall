import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * The design system lives outside of the frontend/ folder.
     * Allow importing its CSS tokens without duplicating files.
     */
    externalDir: true,
  },
  turbopack: {
    /**
     * Enforce the workspace root to silence Turbopack warnings when
     * multiple lockfiles exist at the repository level.
     */
    root: process.cwd(),
  },
};

export default nextConfig;
