export default {
  loading: false,

  router: {
    extendRoutes(routes) {
      routes.push(
        {
          name: 'notFound',
          path: '*',
          component: '~/pages/404.vue',
        },
        {
          name: 'API',
          path: '/api/*',
          component: '~/pages/api.vue',
        }
      )
    },
    middleware: ['auth'],
  },

  head: {
    title: 'Lume',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [
    '~/assets/css/global/transitions',
    '~/assets/css/global/main',
    '~/assets/css/global/templates',
  ],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/logout',
      home: '/dashboard',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: 'api/auth/user',
            method: 'get',
            propertyName: 'user',
          },
          logout: {
            url: 'api/auth/logout',
            method: 'get',
            propertyName: '',
          },
        },
      },
    },
  },

  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://lume.vercel.app'
        : 'http://localhost:3000',
  },

  pwa: {
    manifest: {
      name: 'Lume',
      lang: 'en',
    },
    meta: {
      name: 'Lume',
      ogHost: 'https://lume.vercel.app',
      ogImage: '~/static/icon.png',
    },
  },

  toast: {
    theme: 'outline',
    position: 'top-center',
    duration: 2000,
    keepOnHover: true,
    singleton: true,
  },

  privateRuntimeConfig: {
    PUSHER_KEY: '389a8d7c96b12eded195',
  },

  serverMiddleware: ['~/api/app.js'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
