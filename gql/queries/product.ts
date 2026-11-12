import { graphql } from "#layers/nuxtless/gql/graphql";

export const GetProduct = graphql(`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      variants {
        currencyCode
        price
      }
    }
  }
`);

export const GetProductDetail = graphql(`
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      assets {
        id
        preview
      }
      collections {
        id
        name
        slug
        parent {
          id
          name
          slug
        }
      }
      variants {
        id
        name
        sku
        stockLevel
        currencyCode
        price
        priceWithTax
        options {
          id
          name
          group {
            id
            name
          }
        }
        featuredAsset {
          id
          preview
        }
        assets {
          id
          preview
        }
      }
    }
  }
`);

export const GetProductVariantStock = graphql(`
  query GetProductVariantStock($productId: ID!, $variantId: String!) {
    product(id: $productId) {
      variantList(options: { filter: { id: { eq: $variantId } } }) {
        items {
          stockLevel
        }
      }
    }
  }
`);

export const GetProducts = graphql(`
  query GetProducts($take: Int = 12, $skip: Int = 0) {
    products(options: { take: $take, skip: $skip }) {
      items {
        id
        name
        slug
        description
        featuredAsset {
          id
          preview
        }
        variants {
          currencyCode
          price
        }
      }
      totalItems
    }
  }
`);

export const SearchProducts = graphql(`
  query SearchProducts(
    $term: String!
    $skip: Int
    $take: Int
    $collectionSlug: String
  ) {
    search(
      input: {
        term: $term
        groupByProduct: true
        skip: $skip
        take: $take
        collectionSlug: $collectionSlug
      }
    ) {
      totalItems
      items {
        productName
        slug
        productAsset {
          id
          preview
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        currencyCode
      }
    }
  }
`);
