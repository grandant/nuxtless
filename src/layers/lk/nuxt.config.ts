// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nitro-cloudflare-dev",
    "nuxt-graphql-client",
    "nuxt-link-checker",
    "nuxt-og-image",
    "nuxt-schema-org",
    "pinia-plugin-persistedstate/nuxt",
  ],





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
