/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
