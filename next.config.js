/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    if (!process.env.NGROK_URL) return [];
    return [
      {
        source: "/:path*",
        destination: `${process.env.NGROK_URL}/:path*`,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
