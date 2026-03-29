export default defineAppConfig({
  myLayer: {
    name: "Base Layer",
  },

  countryCodeDefault: "BG",

  ui: {
    colors: {
      primary: "green",
    },
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
    countryCodeDefault?: string;
    ui?: {
      colors?: {
        primary?: string;
      };
    };
  }

  interface AppConfig {
    myLayer: {
      name: string;
    };
    countryCodeDefault: string;
    ui: {
      colors: {
        primary: string;
      };
    };
  }
}

export {};
