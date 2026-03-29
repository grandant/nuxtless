export default defineAppConfig({
  baseLayer: {
    name: "Base Layer",
  },

  countryCodeDefault: "BG",

  logo: {
    light: "/logo-top.svg",
    dark: "/logo-top.svg",
    width: 32,
  },

  ui: {
    colors: {
      primary: "green",
    },
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    baseLayer?: {
      name?: string;
    };
    countryCodeDefault?: string;
    logo?: {
      light?: string;
      dark?: string;
      width?: number;
    };
    ui?: {
      colors?: {
        primary?: string;
      };
    };
  }

  interface AppConfig {
    baseLayer: {
      name: string;
    };
    countryCodeDefault: string;
    logo: {
      light: string;
      dark: string;
      width: number;
    };
    ui: {
      colors: {
        primary: string;
      };
    };
  }
}

export {};
