import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/skin-doctor-saravanampatti",
        destination: "/coimbatore/saravanampatti",
        permanent: true,
      },
      {
        source: "/skin-doctor-ganapathy",
        destination: "/coimbatore/ganapathy",
        permanent: true,
      },
      {
        source: "/dermatologist-thudiyalur",
        destination: "/coimbatore/thudiyalur",
        permanent: true,
      },
      {
        source: "/skin-clinic-peelamedu",
        destination: "/coimbatore/peelamedu",
        permanent: true,
      },
      {
        source: "/best-dermatologist-rs-puram",
        destination: "/coimbatore/rs-puram",
        permanent: true,
      },
      {
        source: "/skin-specialist-gandhipuram",
        destination: "/coimbatore/gandhipuram",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
