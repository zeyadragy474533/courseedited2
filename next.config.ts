import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  allowedDevOrigins: ["localhost", "127.0.0.1", "0.0.0.0", "192.168.1.4"],
};

export default nextConfig;
