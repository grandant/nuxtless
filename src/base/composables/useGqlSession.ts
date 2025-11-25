import type { LogInResult } from "~~/src/types/customer";
import type { ActiveOrder } from "~~/src/types/order";

export async function useGqlSession(
  locale: string,
  gqlHost: string | undefined,
  channelToken: string,
  queryType: "default" | "login" = "default",
  variables?: Record<string, unknown>,
) {
  if (!gqlHost) {
    console.error("useGqlSession: GQL_HOST is not defined");
    return null;
  }

  const authStore = useAuthStore();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = authStore.session?.token;

  if (token) {
    headers.authorization = `Bearer ${token}`;
    authStore.setSession(token);
  }

  if (channelToken) {
    headers["vendure-token"] = channelToken;
  }

  if (locale) {
    headers["Accept-Language"] = locale;
  }

  const defaultQuery = `
    query ActiveOrder {
      activeOrder {
        id
        state
      }
    }
  `;

  const loginQuery = `
    mutation LogInUser($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {
      login(username: $emailAddress, password: $password, rememberMe: $rememberMe) {
        ... on CurrentUser {
          id
          identifier
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `;

  const query = queryType === "login" ? loginQuery : defaultQuery;

  try {
    const res = await fetch(`${gqlHost}?languageCode=${locale}`, {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({ query, variables }),
    });

    const newToken = res.headers.get("vendure-auth-token");
    if (newToken) {
      headers.authorization = `Bearer ${newToken}`;
      authStore.setSession(newToken);
    }

    useGqlHeaders(headers);

    const json = await res.json();
    if (queryType === "login" && json.data?.login) {
      return json.data.login as LogInResult;
    } else if (queryType === "default" && json.data?.activeOrder) {
      return json.data.activeOrder as ActiveOrder;
    }
  } catch (error) {
    console.error("Failed to fetch session token:", error);
    return null;
  }
}
