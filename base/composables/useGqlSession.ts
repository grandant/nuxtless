export async function useGqlSession(locale: string, gqlHost: string) {
  if (!gqlHost) {
    throw new Error("GQL_HOST is not defined");
  }

  const authToken: Ref<string | null> = useState("authToken");
  const channelToken: Ref<string | null> = useState("channelToken");
  const headers: Ref<Record<string, string>> = useState("headers");

  if (authToken.value) {
    headers.value.authorization = `Bearer ${authToken.value}`;
  }

  if (channelToken.value) {
    headers.value["vendure-token"] = channelToken.value;
  }

  if (locale) {
    headers.value["Accept-Language"] = locale;
  }

  const query = `query ActiveOrder {
      activeOrder {
        id
        state
      }
    }
  `;

  try {
    const res = await fetch(`${gqlHost}?languageCode=${locale}`, {
      method: "POST",
      credentials: "include",
      headers: headers.value,
      body: JSON.stringify({ query }),
    });
    authToken.value = res.headers.get("vendure-auth-token");
    console.log(`from useGqlSession: ${authToken.value}`);
  } catch (error) {
    console.error("Failed to fetch session token:", error);
    return;
  }
}
