export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-tiktok-prj',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/notify.client', mode: 'client' },
    { src: '~plugins/notify.server', mode: 'server' },
  ], //{ src: '~/plugins/route.js', ssr: false }
  middleware: ['auth'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],
  // mode: 'spa',
  // loadingIndicator: {
  //   name: 'chasing-dots',
  //   color: '#f39151',
  //   background: 'red',
  // },
  // ssr: false,
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxtjs-mdi-font',
    '@nuxtjs/cloudinary',
    [
      'nuxt-mail',
      {
        message: {
          to: 'sydung2222000@gmail.com',
        },
        smtp: {
          // host: 'smtp.example.com',
          // port: 587,
          // auth: {
          //   user: 'username',
          //   pass: 'password',
          // },
          type: 'SMTP',
          host: 'smtp.gmail.com',
          secure: true,
          port: 465,
          auth: {
            user: 'sydung2222000@gmail.com',
            pass: '01646996951nguyensydung',
          },
        },
      },
    ],
  ],
  cloudinary: {
    cloudName: 'dswt194ko',
    apiKey: '469998898612466', //only needed if you are using server-side upload
    apiSecret: 'bm8SM-dWOOKOIs771TB13HxQFIk', //only needed if you are using server-side upload
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:8000/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
