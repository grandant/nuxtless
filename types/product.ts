// /types/product.ts

import type {
  GetProductQuery,
  GetProductDetailQuery,
  GetProductVariantStockQuery,
  SearchProductsQuery,
} from "~~/.nuxt/gql/default";

// ─────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────

export type ProductBase = GetProductQuery["product"];

export type ProductDetail = GetProductDetailQuery["product"];

export type VariantStock = GetProductVariantStockQuery["product"];

export type SearchResult = SearchProductsQuery["search"]["items"];
