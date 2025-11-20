// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxthub/core",
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
    "nuxt-graphql-client",
    "nuxt-link-checker",
    "nuxt-og-image",
    "nuxt-schema-org",
    "pinia-plugin-persistedstate/nuxt",
  ],

  // @ts-expect-error https://github.com/nuxt/nuxt/issues/32633
  hub: {
    blob: true,
  },

  // App-Wide Settings
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },

  // Pinia Configuration
  pinia: {
    storesDirs: ["./stores/**"],
  },

  // Global NuxtImage  Configuration
  image: {
    domains: ["localhost", "cdn.unstack.dev"],
    provider: process.env.NUXT_PUBLIC_IMAGE_PROVIDER,
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
    documentPaths: ["../base/gql/queries", "../base/gql/fragments"],
    clients: {
      default: {
        schema: "../../graphql.schema.json",
        host: process.env.GQL_HOST || "http://localhost:3001/shop-api",
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
    baseUrl: process.env.NUXT_PUBLIC_I18_BASE_URL,
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
    lazy: false,
    defaultLocale: "en",
  },
});
