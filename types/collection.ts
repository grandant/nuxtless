export type Collection = Awaited<
  ReturnType<typeof GqlGetCollection>
>["collection"];

export type MenuCollections = Awaited<ReturnType<typeof GqlGetMenuCollections>>;

export type TopLevelCollection =
  MenuCollections["collections"]["items"][number];

export type ChildCollection = NonNullable<
  TopLevelCollection["children"]
>[number];
