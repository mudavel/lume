export default {
  loading: false,

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'notFound',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      })
    },
    middleware: ['auth'],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
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

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    'nuxt-socket-io',
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

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://lume.vercel.app',
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  io: {
    sockets: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },

  toast: {
    theme: 'outline',
    position: 'top-center',
    duration: 2000,
    keepOnHover: true,
    singleton: true,
  },

  // privateRuntimeConfig: {
  //   ACCESS_TOKEN_SECRET:
  //     'b475cc8573555862655c5eb196ddae4a350c860a9d8bcf0f45d6ed3890889f02e5c1bd290b2f48b0ac1c4554200b576443f1ddf61fb3e9bcc0c07c8e58c9bc29',
  //   DB_CONNECTION:
  //     'mongodb+srv://usuarioteste:testeusuario@primeirocluster.vcadi.mongodb.net/lume-db',
  // },

  serverMiddleware: ['./api/app.js', './api/ws.js'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
