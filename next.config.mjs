/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Keep other experimental features if any, but remove allowedDevOrigins from here.
  },
  // Add allowedDevOrigins to the root of the config object
  allowedDevOrigins: [
    "https://6000-firebase-studio-1753830952443.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev",
  ],
};

export default nextConfig;
