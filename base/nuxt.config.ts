// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxthub/core",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-graphql-client",
    "pinia-plugin-persistedstate/nuxt",
  ],

  // Shared Runtime Configurations
  runtimeConfig: {
    apiKey: "my-specific-api-key",
    public: {
      apiBase: process.env.API_BASE,
      channelToken: process.env.CHANNEL_TOKEN,
      GQL_HOST: process.env.GQL_HOST,
      i18n: {
        baseUrl: process.env.I18_BASE_URL,
      },
    },
  },

  hub: {
    blob: true,
  },

  // App-Wide Settings
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Global GraphQL Client Configuration
  "graphql-client": {
    clients: {
      default: {
        host: "<graphql_api>",
        token: {
          type: "Bearer",
          name: "Authorization",
          value: "",
        },
        retainToken: true,
      },
    },
  },

  // Global i18n Configuration
  i18n: {
    locales: [
      {
        code: "bg",
        language: "bg_BG",
        file: "bg-BG.json",
        name: "Български 🇧🇬",
      },
      { code: "en", language: "en_US", file: "en-US.json", name: "English 🇺🇸" },
      { code: "de", language: "de_DE", file: "de-DE.json", name: "Deutsch 🇩🇪" },
      { code: "es", language: "es_ES", file: "es-ES.json", name: "Español 🇪🇸" },
      {
        code: "fr",
        language: "fr_FR",
        file: "fr-FR.json",
        name: "Français 🇫🇷",
      },
      {
        code: "it",
        language: "it_IT",
        file: "it-IT.json",
        name: "Italiano 🇮🇹",
      },
      {
        code: "pt",
        language: "pt_BR",
        file: "pt-BR.json",
        name: "Português 🇧🇷",
      },
    ],
    langDir: "./locales",
    lazy: true,
    defaultLocale: "en",
  },
});
