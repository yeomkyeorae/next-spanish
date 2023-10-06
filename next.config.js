/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/nmt/v1/translation",
        destination: "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // "same-origin-allow-popups"
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
