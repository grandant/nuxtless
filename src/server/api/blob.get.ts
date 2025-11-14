export default eventHandler((event) => {
  const { limit, cursor, prefix } = getQuery(event);

  return hubBlob().list({
    limit: limit ? parseInt(limit as string, 10) : 10,
    cursor: typeof cursor === "string" ? cursor : undefined,
    prefix: typeof prefix === "string" ? prefix : undefined,
  });
});
