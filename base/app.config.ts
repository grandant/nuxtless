export default defineAppConfig({
  myLayer: {
    name: "Base Layer",
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    baseLayer?: {
      /** Project name */
      name?: "Nuxt Base Layer";
    };
  }
}
