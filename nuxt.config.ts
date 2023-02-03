export default defineNuxtConfig({
  app: {
      head: {
          title: 'andreww.co',
          meta: [
              { name: 'og:title', content: 'andreww.co'},
              { name: 'theme-color', content: '#FFFCFA'},
              { name: 'og:image', content: '/bg.png' },
              { name: 'twitter:image', content: '/bg.png' }
          ],
          link: [
              { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
          ],
          script: [
              {
                  src: 'https://science.andreww.co/script.js', 'data-site': 'INUIAYEG', defer: true
              }
          ]
      },
  },
  modules: [
      '@nuxtjs/tailwindcss'
  ],
})
