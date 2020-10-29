export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { property: 'og:image', content: '/sharing.png'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#D6073D' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.scss',
  ],
  styleResources: {
    scss: [
      '~assets/styles/vars/*.scss',
      '~assets/styles/mixins.scss',
      '~assets/styles/vars/media.scss',
      '~assets/styles/vars/layout.scss',
      '~assets/styles/vars/skeleton.scss',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~scripts/directives/smooth-height.js',
    '~scripts/plugins/global-values',
    '~scripts/plugins/vue-the-mask',
    '~scripts/plugins/jivosite-chat',
    '~scripts/plugins/validate',
    '~scripts/plugins/nuxt-client-init',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-2107170-92'
    }],
    ['@nuxtjs/yandex-metrika', {
      id: '47297475',
      webvisor: true,
      clickmap:true,
      //useCDN:false,
      //trackLinks:true,
      //accurateTrackBounce:true,
    }],
    [
      'nuxt-vk-rtrg', {
        id: 'VK-RTRG-438056-e10dp'
    }],
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '462483983913804',
      disabled: false
    }],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  svgSprite: {
    input: '~/assets/images/icons',
    output: '~/assets/images/icons-gen',
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vue-the-mask',
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
