/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "boys-pg-website.vercel.app",
          },
        ],
        destination: "https://princedeluxepg.in/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "v0-princedeluxepg.vercel.app",
          },
        ],
        destination: "https://princedeluxepg.in/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.princedeluxepg.in",
          },
        ],
        destination: "https://princedeluxepg.in/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
