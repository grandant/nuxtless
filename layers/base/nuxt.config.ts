import type { LocaleObject } from "@nuxtjs/i18n";
import { appLocales } from "./i18n/locales";

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
    domains: ["localhost"], // add prod domains
    provider: process.env.NUXT_IMAGE_PROVIDER,
    // Provider-specific configuration
    cloudflare: {
      // baseURL: "www.example.com",
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
        headers: {
          "vendure-token": process.env.CHANNEL_TOKEN!,
        },
      },
    },
  },

  // Global i18n Configuration
  i18n: {
    baseUrl: process.env.I18N_BASE_URL,
    locales: appLocales as LocaleObject[],
    defaultLocale: "en",
  },
});
