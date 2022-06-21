import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: [
        { name: 'title', content: 'andreww.co' },
        { name: 'og:title', content: 'andrew.co' },
        { name: 'theme-color', content: '#CDEEFF' },
        {
            name: 'link',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
            rel: 'stylesheet',
        }
    ],
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
})
