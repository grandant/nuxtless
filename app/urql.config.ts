import { cacheExchange, fetchExchange } from "@urql/core";
import { defineUrqlClient } from "#urql/client";

export default defineUrqlClient((ssrExchange) => {
  const nuxtApp = useNuxtApp();

  return {
    exchanges: [cacheExchange, ssrExchange, fetchExchange],
    preferGetMethod: false,
    fetchOptions: () => ({
      headers: {
        "x-locale": nuxtApp.$i18n.locale.value,
      },
    }),
  };
});
