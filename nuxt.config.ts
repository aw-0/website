export default defineNuxtConfig({
    app: {
        head: {
            title: 'andreww.co',
            meta: [
                { name: 'og:title', content: 'andreww.co'},
                { name: 'theme-color', content: '#FFFCFA'},
                { name: 'og:image', content: '/bg.png' },
                { name: 'twitter:image', content: '/bg.png' },
                { name: 'twitter:card', content: 'summary_large_image' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script: [
                {
                    src: 'https://science.wolfsoftworks.com/js/script.js', 'data-domain': 'andreww.co', defer: true
                }
            ]
        },
    },

    modules: [
        '@nuxtjs/tailwindcss'
    ],

    devtools: {
        enabled: true
    }
})
