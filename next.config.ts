/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.researchgate.net"], // 👈 allow this domain
  },
};

module.exports = nextConfig;
