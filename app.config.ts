export default defineAppConfig({
  myLayer: {
    name: "Nuxtless Layer",
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string;
    };
  }
}
