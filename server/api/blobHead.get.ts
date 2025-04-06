export default eventHandler(async (event) => {
  const { pathname } = await getQuery(event);

  const blob = await hubBlob().head(pathname);
  return blob;
});
