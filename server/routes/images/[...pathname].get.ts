export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event);

  // Set a restrictive Content Security Policy
  setHeader(event, "Content-Security-Policy", "default-src 'none';");

  // Serve the image blob from the specified path
  return hubBlob().serve(event, pathname);
});
