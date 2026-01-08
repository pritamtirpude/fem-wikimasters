import { dirname } from "node:path";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: dirname(__filename),
  },
};

export default nextConfig;
