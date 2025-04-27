export async function useGqlSession() {
  const { GQL_HOST: gqlHost } = useRuntimeConfig().public;

  if (!gqlHost) {
    throw new Error("GQL_HOST is not defined");
  }

  const authToken: Ref<string | null> = useState("authToken");
  const channelToken: Ref<string | null> = useState("channelToken");
  const { locale } = useI18n();

  const headers: Ref<Record<string, string>> = useState("headers");

  if (authToken.value) {
    headers.value.authorization = `Bearer ${authToken.value}`;
  }

  if (channelToken.value) {
    headers.value["vendure-token"] = channelToken.value;
  }

  if (locale.value) {
    headers.value["Accept-Language"] = locale.value;
  }

  const query = `query ActiveOrder {
      activeOrder {
        id
        state
      }
    }
  `;

  try {
    const res = await fetch(`${gqlHost}?languageCode=${locale.value}`, {
      method: "POST",
      credentials: "include",
      headers: headers.value,
      body: JSON.stringify({ query }),
    });
    authToken.value = res.headers.get("vendure-auth-token");
  } catch (error) {
    console.error("Failed to fetch session token:", error);
    return;
  }
}
