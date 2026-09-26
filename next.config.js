/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/simulasi-gadai-bpkb-:kota',
        destination: '/simulasi-gadai-bpkb/:kota',
      },
    ];
  },
  output: 'standalone',
};

module.exports = nextConfig;
