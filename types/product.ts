export type ProductBase = Awaited<ReturnType<typeof GqlGetProduct>>["product"];

export type SearchResult = Awaited<
  ReturnType<typeof GqlSearchProducts>
>["search"]["items"];
