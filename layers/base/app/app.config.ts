export default defineAppConfig({
  myLayer: {
    name: "Base Layer",
  },
  appLocales: ["en", "bg", "ru", "fa", "de", "es", "fr", "it", "pt"],
  countryCodeDefault: "BG",
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    baseLayer?: {
      /** Project name */
      name?: "Nuxt Base Layer";
    };
    appLocales?: string[];
    countryCodeDefault?: string;
  }
}
