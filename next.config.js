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
}

module.exports = nextConfig
