import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

import { appLocales } from "./i18n/locales/locales";

export default defineNuxtConfig({
  modules: [
    "@bicou/nuxt-urql",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  $meta: {
    name: "nuxtless",
  },

  devtools: { enabled: true },

  css: ["#layers/nuxtless/app/assets/css/main.css"],

  site: {
    url: process.env.NUXT_SITE_URL,
    name: "Nuxtless",
  },

  runtimeConfig: {
    channelToken: process.env.NUXT_CHANNEL_TOKEN,
    vendureBase: process.env.NUXT_VENDURE_BASE,
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
        subsets: ["cyrillic", "latin", "latin-ext"],
        global: true,
      },
    ],
  },

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    baseUrl: process.env.NUXT_SITE_URL,
    locales: appLocales,
  },

  pinia: {
    storesDirs: ["../stores/**"],
  },

  scripts: {
    registry: {
      stripe: {
        trigger: "onNuxtReady",
      },
    },
  },

  urql: {
    endpoint: "/api/graphql",
    client: fileURLToPath(new URL("./app/urql.config.ts", import.meta.url)),
    ssr: {
      endpoint: `${process.env.NUXT_SITE_URL}/api/graphql`,
    },
  },
});
