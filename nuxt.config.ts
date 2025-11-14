// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { shopIdentity } from "./src/schema/identity";

export default defineNuxtConfig({
  compatibilityDate: "2025-09-30",
  devtools: { enabled: import.meta.env.DEV },

  experimental: {
    typescriptPlugin: true,
  },

  srcDir: "./src/app",

  extends: ["./src/base"],

  css: ["./src/app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

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
      // Optional sitemap integration.
      // Requires custom logic to fetch Vendure products and collections.
      // This can be handled via a third-party backend service.
      // A recipe or mapping example can be provided on request.
    ],
  },
});
