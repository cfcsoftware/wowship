const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'healthrxai.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },


      
    ],
  },

  // Enables fallback page if dynamic routes/chunks fail
  generateBuildId: async () => {
    return Date.now().toString(); // optional: use a custom unique build id per deploy
  },

  async rewrites() {
    return [
      { source: "/login", destination: "/auth/login" },
      { source: "/register", destination: "/auth/register" },
    ];
  },
};
export default nextConfig;
