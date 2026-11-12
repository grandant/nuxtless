import { graphql } from "#layers/nuxtless/gql/graphql";

export const ProductVariantFragment = graphql(`
  fragment ProductVariantFragment on ProductVariant {
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
`);

export const ProductBaseFragment = graphql(`
  fragment ProductBaseFragment on Product {
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
`);

export const ProductDetailFragment = graphql(`
  fragment ProductDetailFragment on Product {
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
`);

export const ProductSearchFragment = graphql(`
  fragment ProductSearchFragment on SearchResult {
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
`);
