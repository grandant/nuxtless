export default eventHandler(async (event) => {
  const { pathname } = getQuery(event);
  const blob = await hubBlob().head(pathname as string);

  return blob;
});
