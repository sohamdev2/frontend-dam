import redirectSSL from 'redirect-ssl'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  loading: {
    color: '#ed703d',
    height: '3px',
  },

  head: {
    // title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "Simplify,streamline & accelerate the marketer's life",
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
        hid: 'favicon',
      },
      {
        //  Adobe Acumin Font
        rel: 'stylesheet',
        href: 'https://use.typekit.net/oep8bma.css',
      },
    ],
    script: [
      {
        src: `https://www.bugherd.com/sidebarv2.js?apikey=${process.env.BUGHERD_KEY}`,
        async: 'true',
      },
      { src: '/js/jquery.min.js' },
      { src: '/js/popper.min.js' },
      { src: '/js/plugin.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/script.js' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/bootstrap.min.css',
    '~/assets/css/plugin.css',
    '~/assets/css/style.css',
    '~/assets/css/dev.vendor.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/v-clipboard.js',
    '~/plugins/v-tooltip.js',
    '~/plugins/vue-async-computed.js',
    '~/plugins/helper.js',
    '~/plugins/vue-infinite-loading.js',
    { src: '~/plugins/vue-infinite-scroll.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-audio-visual.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' },
    { src: '~/plugins/bus' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  /* components: true, */
  components: {
    dirs: [
      '~/components',
      '~/components/dam',
      '~/components/Global',
      '~/components/svg',
      '~/components/widgets',
    ],
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    [
      '@pranavraut033/laravel-echo',
      {
        broadcaster: 'pusher',
        key: process.env.PUSHER_KEY,
        cluster: process.env.PUSHER_CLUSTER,

        authModule: true,
        connectOnLogin: true,
        disconnectOnLogout: true,
        authEndpoint: process.env.PUSHER_AUTH_ENDPOINT,

        // wsHost: process.env.WEBSOCKET_HOST,
        // wsPort: process.env.WEBSOCKET_PORT,
        // encrypted: true,
        // disableStats: true,

        // Laravel websocket settings
        /* wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true, */
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    // [
    //   'nuxt-vuex-localstorage',
    //   {
    //     localStorage: ['appData'], //  If not entered, ???localStorage??? is the default value
    //   },
    // ],
  ],

  router: {
    // middleware: ['verify-brand-name', 'auth'],
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'page_not_found',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue'),
    //   })
    // },
  },

  auth: {
    redirect: false,
    strategies: {
      local: {
        token: {
          property: 'data.access_token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data.user',
        },
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'data.access_token',
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: 'data.user',
          },
          logout: {
            url: 'logout',
            method: 'post',
          },
        },
      },
      passwordLess: {
        scheme: 'local',
        token: {
          property: 'data.access_token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'data.user',
        },
        endpoints: {
          login: {
            url: 'login-with-id',
            method: 'post',
            propertyName: 'data.access_token',
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: 'data.user',
          },
          logout: {
            url: 'logout',
            method: 'post',
          },
        },
      },
    },
    cookie: {
      options: {
        path: '/',
        secure: process.env.SECURE_AUTH_COOKIE === 'true',
      },
    },
  },
  toast: {
    position: 'top-center',
    theme: 'toasted-primary', // toasted-primary, outline, bubble
    duration: '5000',
    iconPack: 'fontawesome',
    /* action: [
      {
        text: 'close',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      }
    ], */
    register: [
      {
        name: 'success',
        message: (message) => message,
        options: {
          type: 'success',
          icon: 'check',
        },
      },
      {
        name: 'error',
        message: (message) => message,
        options: {
          type: 'error',
          icon: 'exclamation-circle',
        },
      },
      {
        name: 'info',
        message: (message) => message,
        options: {
          type: 'info',
          icon: 'exclamation',
        },
      },
    ],
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_BASE_URL,
    https: process.env.HTTPS === 'true',
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
    (req, res, next) => {
      if (/\/{2,}/.test(req.url)) {
        const url = req.url.replace(/\/{2,}/g, '/')
        res.writeHead(301, { Location: url })
        return res.end()
      }
      next()
    },
    '~/middleware/url-check.js',
    { path: '/convert', handler: '~/api-middlewares/media-converter' },
  ],
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },
  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    baseUrl: process.env.BASE_URL,
    apiBaseUrl: process.env.API_BASE_URL,
    backendUrl: process.env.BACKEND_URL,
    userPlaceHolderImg: process.env.USER_PLACEHOLDER_IMG,
    googleAuthUrl: process.env.GOOGLE_AUTH_URL,
    bugherdKey: process.env.BUGHERD_KEY,
    damBackendBaseUrl: process.env.MARCOM_URL,
  },
  privateRuntimeConfig: {},
}
