/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Permissions-Policy',
    value: 'interest-cohort=()'
  }
];

const nextConfig = {
  output: 'export',
  env: {
        baseUrl: 'https://localhost:3000',
      },
  async headers() {
    return [
      {
        // Thêm các header an ninh
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
