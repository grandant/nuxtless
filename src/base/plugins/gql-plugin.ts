import type { GqlError } from "nuxt-graphql-client";

export default defineNuxtPlugin(() => {
  useGqlError((err: GqlError) => {
    console.error("[GQL Error]", {
      statusCode: err.statusCode,
      operation: err.operationName,
      errors: err.gqlErrors,
    });
  });
});
