export default defineAppConfig({
  appLocales:["ru","en"],
  countryCodeDefault:"RU",
  ui:{
    colors: {
      primary: 'violet',
      neutral: 'zinc'
    },
    table: {
      slots: {
        tbody: '',
        td: 'border-none'
      }
    },
  }
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    appLocales:string[]
    countryCodeDefault:string
  }
}

export {}
