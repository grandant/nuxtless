// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { siteIdentity } from "./schema/identity";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: import.meta.env.DEV },

  experimental: {
    typescriptPlugin: true,
  },

  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  extends: ["./layers/base"],

  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
      channelToken: process.env.CHANNEL_TOKEN,
      i18NBaseUrl: process.env.I18N_BASE_URL,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      unsplashApiKey: process.env.UNSPLASH_API_KEY,
    },
  },

  // NuxtSEO Modules Config
  ogImage: {
    security: {
      secret: process.env.OG_IMAGE_SECRET,
    },
  },

  robots: {
    disallow: ["/account", "/checkout", "/confirmation", "/cart", "/search"],
    allow: "/",
    blockNonSeoBots: true,
  },

  schemaOrg: {
    identity: siteIdentity,
  },

  site: {
    url: siteIdentity.url,
    name: siteIdentity.name,
    description: siteIdentity.description,
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
