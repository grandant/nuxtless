import {
  createError,
  defineEventHandler,
  getCookie,
  getHeader,
  getRequestURL,
  readBody,
  setCookie,
  setResponseStatus,
} from "h3";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
  operationName?: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  if (!config.vendureBase) {
    throw createError({
      statusCode: 500,
      statusMessage: "Vendure Shop API is not configured",
    });
  }

  const origin = getHeader(event, "origin");

  if (origin && origin !== getRequestURL(event).origin) {
    throw createError({ statusCode: 403 });
  }

  const body = await readBody<GraphQLRequest>(event);

  if (!body?.query || typeof body.query !== "string") {
    throw createError({ statusCode: 400 });
  }

  const token = getCookie(event, "vendure-session");
  const locale = getHeader(event, "x-locale") ?? "en";

  const url = new URL(config.vendureBase);
  url.searchParams.set("languageCode", locale);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (config.channelToken) {
    headers["vendure-token"] = config.channelToken;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const newToken = response.headers.get("vendure-auth-token");

  if (newToken) {
    setCookie(event, "vendure-session", newToken, {
      httpOnly: true,
      secure: !import.meta.dev,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  setResponseStatus(event, response.status);

  const data = await response.json();

  if (
    body.query?.includes("mutation LogOutUser") &&
    data.data?.logout?.success === true
  ) {
    deleteCookie(event, "vendure-session", { path: "/" });
  }

  return data;
});
