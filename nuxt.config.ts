// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { shopIdentity } from "./schema/identity";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: import.meta.env.DEV },

  future: {
    compatibilityVersion: 4,
  },

  extends: ["./base"],
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  pinia: {
    storesDirs: ["./base/stores/**"],
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
      [
        `${process.env.NUXT_PUBLIC_API_BASE}/vendure/sitemap?base_url=${process.env.NUXT_PUBLIC_I18N_BASE_URL}`,
        {
          headers: { "vendure-token": process.env.NUXT_PUBLIC_CHANNEL_TOKEN! },
        },
      ],
    ],
  },
});
