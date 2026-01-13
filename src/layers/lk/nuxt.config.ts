// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {

    preset: 'node-server', // Сброс к значению по умолчанию (автоопределение)
    cloudflare: {
      deployConfig: false,
      nodeCompat: false,
    },
  },
  experimental:{
    viteEnvironmentApi: true,
    noVueServer: true
  },
  future: {
    compatibilityVersion: 5, // Или 5, если вы уже перешли на последние стандарты 2026 года
  },
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: '127.0.0.1'
      }
    },
    optimizeDeps: {
      // Принудительно включаем тяжелые модули в пре-бандлинг
      //include: ['lodash', 'date-fns', 'your-heavy-library']
    }
  },
  devServer: {
    host: '127.0.0.1' // Ускоряет установку соединения в некоторых ОС
  },
  ogImage: { enabled: false },
  ssr: false,
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'zinc'
    },
    table: {
      slots: {
        tbody: '',
        td: 'border-none'
      }
    }
  },
  "graphql-client": {
    codegen: {
      disableOnBuild: false,
      onlyOperationTypes: false,
    },
    documentPaths: [
      "../layers/lk/gql/queries",
      "../layers/lk/gql/fragments"
    ]
  },

  // Global NuxtImage  Configuration
  image: {
    domains: ["localhost", "cdn.unstack.dev"],
    provider: process.env.NUXT_PUBLIC_IMAGE_PROVIDER,
    cloudflare: {
      baseURL: "https://cdn.unstack.dev",
    },
  },



  // NuxtScripts Registry
  scripts: {
    registry: {
      stripe: false,
    },
  },

  router: {
    middleware: ['auth']
  },
  // Global i18n Configuration
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_I18_BASE_URL,
    locales: [
      { code: "ru", language: "ru-RU", file: "ru-RU.ts", name: "Русский 🇷🇺" },
    ],
    defaultLocale: "ru",
  },
});
