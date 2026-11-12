import { GetMenuCollections } from "#layers/nuxtless/gql/queries/collection";

export function useMenuCollections() {
  const client = useUrqlClient();

  return useAsyncData("menuCollections", async () => {
    const { data, error } = await client
      .query(GetMenuCollections, {})
      .toPromise();

    if (error) throw error;

    return data;
  });
}
