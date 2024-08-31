/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable React strict mode
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Specify the port for local development
      },
      {
        protocol: "http",
        hostname: "192.168.1.8",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
