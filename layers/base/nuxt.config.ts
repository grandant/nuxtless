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

  // App-Wide Settings
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },

  // Pinia Configuration
  pinia: {
    storesDirs: ["../stores/**"],
  },

  // Global NuxtImage  Configuration
  image: {
    domains: ["localhost", "cdn.unstack.dev"],
    provider: process.env.NUXT_IMAGE_PROVIDER,
    cloudflare: {
      baseURL: "https://cdn.unstack.dev",
    },
  },

  // ColorMode Settings (currently defaults)
  colorMode: {
    preference: "system",
    fallback: "light",
  },

  // NuxtScripts Registry
  scripts: {
    registry: {
      stripe: true,
    },
  },

  // Global GraphQL Client Configuration
  "graphql-client": {
    codegen: {
      disableOnBuild: false,
      onlyOperationTypes: false,
    },
    documentPaths: [
      "../layers/base/gql/queries",
      "../layers/base/gql/fragments",
    ],
    clients: {
      default: {
        schema: "../graphql.schema.json",
        host: process.env.GQL_HOST!,
        token: {
          type: "Bearer",
          name: "Authorization",
          value: "",
        },
        retainToken: true,
        headers: {
          "vendure-token": process.env.CHANNEL_TOKEN!,
        },
      },
    },
  },

  // Global i18n Configuration
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_I18_BASE_URL,
    locales: [
      {
        code: "bg",
        language: "bg-BG",
        file: "bg-BG.ts",
        name: "Български 🇧🇬",
      },
      { code: "ru", language: "ru-RU", file: "ru-RU.ts", name: "Русский 🇷🇺" },
      { code: "en", language: "en-US", file: "en-US.ts", name: "English 🇺🇸" },
      { code: "de", language: "de-DE", file: "de-DE.ts", name: "Deutsch 🇩🇪" },
      { code: "es", language: "es-ES", file: "es-ES.ts", name: "Español 🇪🇸" },
      {
        code: "fr",
        language: "fr-FR",
        file: "fr-FR.ts",
        name: "Français 🇫🇷",
      },
      {
        code: "it",
        language: "it-IT",
        file: "it-IT.ts",
        name: "Italiano 🇮🇹",
      },
      {
        code: "pt",
        language: "pt-BR",
        file: "pt-BR.ts",
        name: "Português 🇧🇷",
      },
    ],
    defaultLocale: "en",
  },
});
