import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: "andreww.co",
        link: [
            {
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
                rel: 'stylesheet',
            }
        ],
    },
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
})
