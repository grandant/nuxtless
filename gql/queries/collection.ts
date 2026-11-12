import { graphql } from "#layers/nuxtless/gql/graphql";
import {
  CollectionBaseFragment,
  CollectionMenuFragment,
} from "../fragments/collection";
import { ProductSearchFragment } from "../fragments/product";

export const GetMenuCollections = graphql(
  `
    query GetMenuCollections {
      collections(options: { topLevelOnly: true }) {
        items {
          ...CollectionMenuFragment
        }
      }
    }
  `,
  [CollectionMenuFragment],
);

export const GetCollection = graphql(
  `
    query GetCollection($slug: String!) {
      collection(slug: $slug) {
        ...CollectionBaseFragment
      }
    }
  `,
  [CollectionBaseFragment],
);

export const GetCollectionProducts = graphql(
  `
    query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {
      search(
        input: {
          collectionSlug: $slug
          groupByProduct: true
          skip: $skip
          take: $take
        }
      ) {
        totalItems
        items {
          ...ProductSearchFragment
        }
      }
    }
  `,
  [ProductSearchFragment],
);
