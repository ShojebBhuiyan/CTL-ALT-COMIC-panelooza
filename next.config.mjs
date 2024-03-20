/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "64.media.tumblr.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
