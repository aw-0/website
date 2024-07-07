export default defineNuxtConfig({
    ssr: true,

    app: {
        head: {
            title: 'andreww.co',
            meta: [
                { name: 'og:title', content: 'andreww.co'},
                { name: 'theme-color', content: '#FEF7ED'},
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

    routeRules: {
        '/api/getTopSongs': { isr: 172800 }
    },

    nitro: {
        preset: 'vercel-edge'
    },

    modules: [
        '@nuxtjs/tailwindcss'
    ],

    devtools: {
        enabled: true
    },

    compatibilityDate: '2024-07-04'
})