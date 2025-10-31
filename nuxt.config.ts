// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { shopIdentity } from "./schema/identity";

export default defineNuxtConfig({
  compatibilityDate: "2025-09-30",
  devtools: { enabled: import.meta.env.DEV },

  experimental: {
    typescriptPlugin: true,
  },

  extends: ["./base"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  pinia: {
    storesDirs: ["./base/stores/**"],
  },

  // Note: runtimeConfig is overridden. Better to keep it central.
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
      channelToken: process.env.CHANNEL_TOKEN,
      payloadBase: process.env.PAYLOAD_BASE,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      unsplashApiKey: process.env.UNSPLASH_API_KEY,
    },
  },

  // NuxtSEO Modules Config
  robots: {
    disallow: ["/account", "/checkout", "/confirmation", "/cart", "/search"],
    allow: "/",
    blockNonSeoBots: true,
  },

  schemaOrg: {
    identity: shopIdentity,
  },

  site: {
    url: process.env.NUXT_PUBLIC_I18N_BASE_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    description: "Nuxt Level Headless E-commerce",
    env: process.env.NODE_ENV,
    indexable: process.env.NODE_ENV === "production",
    trailingSlash: false,
  },

  sitemap: {
    sources: [
      // [
      //   `${process.env.NUXT_PUBLIC_API_BASE}/vendure/sitemap?base_url=${process.env.NUXT_PUBLIC_I18N_BASE_URL}`,
      //   {
      //     headers: { "vendure-token": process.env.NUXT_PUBLIC_CHANNEL_TOKEN! },
      //   },
      // ],
    ],
  },
});
