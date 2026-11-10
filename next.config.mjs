/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.VERCEL_ENV !== "preview") return [];

    return [
      { source: "/widget-test", destination: "/api/copilot-preview" },
      { source: "/copilot-api/:path+", destination: "/api/copilot-preview/:path+" },
    ];
  },
  env: {
    // NEXT_PUBLIC_API_URL: "http://localhost:1339",
    NEXT_PUBLIC_API_URL: "https://backend-new.dreamsrealty.co.in",
    GOOGLE_API_URL: "https://maps.googleapis.com",
    GOOGLE_API_URL: "https://maps.googleapis.com",
    GOOGLE_API_KEY: "AIzaSyB_LZsNx4Hw-XJGOO78C_cWhci9M3vDrv4",
    GOOGLE_PLACE_ID: "ChIJW1rxmegRrjsRb6WkQPhNhUw",
  },
};

export default nextConfig;
