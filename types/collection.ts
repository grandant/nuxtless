// /types/collection.ts

import type {
  GetCollectionQuery,
  GetMenuCollectionsQuery,
} from "~~/.nuxt/gql/default";

// ─────────────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────────────

export type Collection = GetCollectionQuery["collection"];

export type MenuCollections = GetMenuCollectionsQuery;

export type TopLevelCollection =
  MenuCollections["collections"]["items"][number];

export type ChildCollection = NonNullable<
  TopLevelCollection["children"]
>[number];
