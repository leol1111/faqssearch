/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
        baseUrl: 'https://leol1111.github.io/faqssearch',
      },
  async headers() {
    return [
      {
        source: "/faqssearch/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
