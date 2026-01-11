export default defineAppConfig({
  appLocales:["ru","en"],
  countryCodeDefault:"RU"
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    appLocales:string[]
    countryCodeDefault:string
  }
}

export {}
