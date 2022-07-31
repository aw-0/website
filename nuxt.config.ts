import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'andreww.co',
            meta: [
                { name: 'og:title', content: 'andreww.co'},
                { name: 'theme-color', content: '#CDEEFF'},
            ],
            link: [
                { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
                rel: 'stylesheet' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script: [
                {
                    src: 'https://science.andreww.co/script.js', 'data-site': 'INUIAYEG', defer: true
                }
            ]
        },
    },
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
})
