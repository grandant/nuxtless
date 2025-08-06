export default defineNuxtPlugin(() => {
  useGqlError((err) => {
    console.error("[GQL Error]", {
      statusCode: err.statusCode,
      operation: err.operationName,
      errors: err.gqlErrors,
    });
  });
});
