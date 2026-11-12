import {
  array,
  nullable,
  number,
  object,
  string,
  type InferOutput,
} from "valibot";

const ProductAsset = object({
  id: string(),
  preview: string(),
});

const ProductCollection = object({
  id: string(),
  name: string(),
  slug: string(),
  parent: nullable(
    object({
      id: string(),
      name: string(),
      slug: string(),
    }),
  ),
});

const ProductVariant = object({
  id: string(),
  name: string(),
  sku: string(),
  stockLevel: string(),
  currencyCode: string(),
  price: number(),
  priceWithTax: number(),
  options: array(
    object({
      id: string(),
      name: string(),
      group: object({
        id: string(),
        name: string(),
      }),
    }),
  ),
  featuredAsset: nullable(ProductAsset),
  assets: array(ProductAsset),
});

export const ProductDetail = object({
  id: string(),
  name: string(),
  slug: string(),
  description: string(),
  featuredAsset: nullable(ProductAsset),
  assets: array(ProductAsset),
  collections: array(ProductCollection),
  variants: array(ProductVariant),
});

export type ProductDetail = InferOutput<typeof ProductDetail>;
