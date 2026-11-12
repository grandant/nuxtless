import { graphql } from "#layers/nuxtless/gql/graphql";

export const CollectionBaseFragment = graphql(`
  fragment CollectionBaseFragment on Collection {
    id
    name
    slug
    description
    featuredAsset {
      id
      preview
    }
  }
`);

export const CollectionMenuFragment = graphql(`
  fragment CollectionMenuFragment on Collection {
    id
    name
    slug
    parentId
    featuredAsset {
      id
      preview
    }
    children {
      id
      name
      slug
      featuredAsset {
        id
        preview
      }
    }
  }
`);
