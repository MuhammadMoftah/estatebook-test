import {
  googleFonts,
  i18n,
  tailwindcss,
  axios,
  typescriptBuild,
} from './config'
import { auth } from './config/auth'
// eslint-disable-next-line nuxt/no-cjs-in-config
const $axios = require('axios')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  target: 'server',
  router: {
    routeNameSplitter: '/',
  },
  head: {
    // title: 'It’s time for EstateBook. Find all about Egypt properties.',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // {
      //   hid: 'description',
      //   name: 'description',
      //   content:
      //     ' It’s Time, to learn, discover, grow, & invest with EstateBook. An ultimate online space for anyone interested in the real estate market.',
      // },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        hid: 'gtm',
        innerHTML: `window.dataLayer = window.dataLayer || [];`,
        type: 'text/javascript',
      },
      {
        hid: 'gtm',
        innerHTML: `window.dataLayer = window.dataLayer || [];`,
        type: 'text/javascript',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://api.theestatebook.net/storage/16375/conversions/c6bf701533-webp_format.webp',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content:
          'https://api.theestatebook.net/storage/16375/conversions/c6bf701533-webp_format.webp',
      },
      // {
      //   innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      //   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      //   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      //   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      //   })(window,document,'script','dataLayer','GTM-NHGX3WR');`,
      //   type: 'text/javascript',
      // },
      {
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true,
      },
    ],
    noscript: [{ children: 'Javascript is required' }],
  },
  render: {
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
    etag: {
      weak: false,
    },
  },
  serverMiddleware: ['~/server-middleware/cacheControl.ts'],
  asyncScripts: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/flicking-inline.min.css',
    '~/assets/css/flicking-plugins.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: [
    '~mixins/global',
    '~/plugins/numberFormat.ts',
    '~plugins/vuelidate.ts',
    '~plugins/lazyHydrate.ts',
    { src: '~/plugins/gmapVue.ts', mode: 'client' },
    { src: '~/plugins/vueCustomMarker.ts', mode: 'client' },
    { src: '~/plugins/vueSlider.ts', mode: 'client' },
    { src: '~plugins/vueClickAway.ts', mode: 'client' },
    { src: '~plugins/pdfViewer.ts', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    ['@nuxt/typescript-build', typescriptBuild],
    // https://go.nuxtjs.dev/tailwindcss
    ['@nuxtjs/tailwindcss', tailwindcss],
    [
      'nuxt-compress',
      {
        brotli: {
          threshold: 8192,
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ['@nuxtjs/axios', axios],
    ['@nuxtjs/google-fonts', googleFonts],
    ['@nuxtjs/i18n', i18n],
    ['@nuxtjs/auth-next', auth],
    // [
    //   'nuxt-ssr-cache',
    //   {
    //     useHostPrefix: false,
    //     pages: ['/'],
    //     store: {
    //       type: 'memory',
    //       max: 50,
    //       ttl: 3600,
    //     },
    //   },
    // ],
    'vue-toastification/nuxt',
    'vue-social-sharing/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'cookie-universal-nuxt',
  ],

  robots: {
    UserAgent: '*',
    Disallow: '',
  },
  sitemap: {
    // hostname: 'https://www.estatebook.com',
    // nuxt-i18n notation (advanced)
    routes: async () => {
      // Generate units links
      const { data: UnitsRes } = await $axios.get(
        `${process.env.BASE_URL}/all_units`
      )
      const UnitsDataEn = UnitsRes.data.map(el => `en/units/${el.slug}`)
      const UnitsDataAr = UnitsRes.data.map(el => `ar/units/${el.slug}`)
      const UnitData = [...UnitsDataEn, ...UnitsDataAr]

      // Generate projects links
      const { data: ProjectsRes } = await $axios.get(
        `${process.env.BASE_URL}/all_projects`
      )
      const ProjectsDataEn = ProjectsRes.data.map(
        el => `en/projects/${el.slug}`
      )
      const ProjectsDataAr = ProjectsRes.data.map(
        el => `ar/projects/${el.slug}`
      )
      const ProjectsData = [...ProjectsDataEn, ...ProjectsDataAr]

      // Generate developers links
      const { data: DevelopersRes } = await $axios.get(
        `${process.env.BASE_URL}/all_developers`
      )
      const DevelopersDataEn = DevelopersRes.data.map(
        el => `en/developers/${el.slug}`
      )
      const DevelopersDataAr = DevelopersRes.data.map(
        el => `ar/developers/${el.slug}`
      )
      const DevelopersData = [...DevelopersDataEn, ...DevelopersDataAr]

      // Generate locations links
      const { data: LocationsRes } = await $axios.get(
        `${process.env.BASE_URL}/all_locations`
      )
      const LocationsDataEn = LocationsRes.data.map(
        el => `en/neighborhoods/${el.slug}`
      )
      const LocationsDataAr = LocationsRes.data.map(
        el => `ar/neighborhoods/${el.slug}`
      )
      const LocationsData = [...LocationsDataEn, ...LocationsDataAr]

      return [...UnitData, ...ProjectsData, ...DevelopersData, ...LocationsData]
    },
  },

  // auth: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
    extend(config, ctx) {
      config.resolve.symlinks = false
    },
  },
}
