/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/links/discord',
        destination: 'https://discord.com/channels/@me/289894338132180992',
        permanent: false,
      },
      {
        source: '/links/github',
        destination: 'https://github.com/aw-0',
        permanent: false,
      },
      {
        source: '/links/linkedin',
        destination: 'https://www.linkedin.com/in/andrew-wolf-a5a746234/',
        permanent: false,
      },
      {
        source: '/links/spotify',
        destination: 'https://open.spotify.com/user/greenappled',
        permanent: false,
      },
      {
        source: '/links/twitter',
        destination: 'https://twitter.com/andwolf_',
        permanent: false,
      },
      {
        source: '/meet/30',
        destination: 'https://calendar.app.google/mWDevmTbuEPdsvY27',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
