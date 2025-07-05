export type ProductBase = Awaited<ReturnType<typeof GqlGetProduct>>["product"];

export type ProductDetail = Awaited<
  ReturnType<typeof GqlGetProductDetail>
>["product"];

export type VariantStock = Awaited<
  ReturnType<typeof GqlGetProductVariantStock>
>["product"];

export type SearchResult = Awaited<
  ReturnType<typeof GqlSearchProducts>
>["search"]["items"];
