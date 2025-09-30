import { defineOrganization } from "nuxt-schema-org/schema";

export const shopIdentity = defineOrganization({
  "@type": ["Organization", "Store", "OnlineStore"],
  name: "Nuxtless",
  alternateName: "Unstack, UDevCo, unstack.dev",
  description:
    "Modern headless e-commerce platform built on Nuxt and Vendure. SEO-first, secure, type-safe.",
  url: "https://nuxtless.unstack.dev",
  logo: "/favicon.ico",
  email: "support@unstack.dev",
  foundingDate: "2025-01-01",
  legalName: "Candaon Ltd.",
  vatID: "BG204894731",
  paymentAccepted: ["Credit Card", "Cash on Delivery"],
  currenciesAccepted: ["EUR", "BGN"],
  // sameAs: [
  //   "https://github.com/unstack",
  //   "https://linkedin.com/company/unstack",
  //   "https://twitter.com/unstack",
  // ],
  slogan: "Nuxt Level Headless E-commerce",
  keywords: ["headless commerce", "nuxt", "vendure", "ecommerce platform"],
});
