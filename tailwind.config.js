/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      colors: {
        'bg-deep': '#0a0a0a',
        'bg-surface': '#141414',
        'halftone-cream': '#f2ece4',
        'film-amber': '#e8a87c',
        'light-leak': '#ff6b35',
        'light-leak-red': '#c94043',
        primary: '#ebe6df',
        muted: '#8a8578',
      },
    },
  },
  plugins: [],
}
