/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pub-3ea46b7dcfbf4dd9828bfd06c1989ace.r2.dev',
          port: '', // If there's no specific port, leave it as an empty string
          pathname: '/**', // This allows all images from the hostname
        },
      ],
    },
};

export default nextConfig;
