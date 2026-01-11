// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Global GraphQL Client Configuration
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
