import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    head: {
        meta: [
            { name: 'title', content: 'andreww.co' },
            { name: 'og:title', content: 'andreww.co'},
            { name: 'theme-color', content: '#CDEEFF'},
        ],
        link: [
            {
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
                rel: 'stylesheet',
            }
        ]
    },
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
})
