import { sortRoutes } from '@nuxt/utils'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://lume.vercel.app'
    : require('./config').BASE_URL

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
          name: 'noAPI',
          path: '/api/*',
          component: '~/pages/api.vue',
        }
      )
      sortRoutes(routes)
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

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [
    '@nuxt/http',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
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
          logout: false,
        },
      },
    },
  },

  http: {
    baseURL: BASE_URL,
  },

  axios: {
    baseURL: BASE_URL,
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

  build: {},
}
