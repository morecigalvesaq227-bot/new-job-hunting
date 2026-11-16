import type { NextConfig } from "next";
const githubPages = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(githubPages ? { basePath: "/new-job-hunting", trailingSlash: true } : {}),
};
export default config;
