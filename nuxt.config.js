import { sortRoutes } from '@nuxt/utils'

const BASE_URL = process.env.BASE_URL || require('./config').BASE_URL

export default {
  loading: false,
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  serverMiddleware: ['~/api/app.js'],
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
  axios: {
    baseURL: BASE_URL,
  },
  css: [
    '~/assets/css/global/transitions',
    '~/assets/css/global/main',
    '~/assets/css/global/templates',
  ],
  head: {
    title: 'Lume',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-site-verification',
        content: '0dGRAvJ1Qj9jdIHlpuV9n9By5vcfDsTPr3J3KqLIG1o',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Lume: An uncommon but nice chat application.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  http: {
    baseURL: BASE_URL,
  },
  messages: {
    error_404: 'Not found... Are you lost?',
  },
  modules: [
    '@nuxt/http',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],
  publicRuntimeConfig: {
    PUSHER_KEY: '389a8d7c96b12eded195',
  },
  pwa: {
    manifest: {
      name: 'Lume',
      lang: 'en',
    },
    meta: {
      name: 'Lume',
      ogHost: 'https://lume.vercel.app',
      ogImage: '/icon.svg',
    },
    icon: {
      source: '~/static/icon.svg',
    },
  },
  router: {
    extendRoutes(routes) {
      routes.push({
        name: 'noAPI',
        path: '/api/*',
        component: '~/pages/api.vue',
      })
      sortRoutes(routes)
    },
    middleware: ['auth'],
  },
  toast: {
    theme: 'outline',
    position: 'top-center',
    duration: 2000,
    keepOnHover: true,
    singleton: true,
  },
}
