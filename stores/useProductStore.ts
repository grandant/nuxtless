import { GetProductVariantStock } from "#layers/nuxtless/gql/queries/product";

import type { ProductDetail } from "#layers/nuxtless/validators/product";

export const useProductStore = defineStore("product", () => {
  const product = ref<ProductDetail | null>(null);
  const selectedOptions = ref<Record<string, string>>({});

  const selectedVariant = computed(
    () =>
      product.value?.variants.find((v) =>
        v.options.every(
          (opt) => selectedOptions.value[opt.group.id] === opt.id,
        ),
      ) ?? null,
  );

  const optionGroups = computed(() => {
    if (!product.value?.variants?.length) return [];

    const groups = new Map<
      string,
      { id: string; name: string; values: { id: string; name: string }[] }
    >();

    for (const variant of product.value.variants) {
      for (const option of variant.options) {
        if (!groups.has(option.group.id)) {
          groups.set(option.group.id, {
            id: option.group.id,
            name: option.group.name,
            values: [],
          });
        }
        const group = groups.get(option.group.id)!;
        if (!group.values.some((v) => v.id === option.id)) {
          group.values.push({ id: option.id, name: option.name });
        }
      }
    }

    return Array.from(groups.values());
  });

  const hasOptions = computed(() => optionGroups.value.length > 0);

  const liveStock = ref<string | null>(null);

  const stockLevel = computed(
    () => liveStock.value ?? selectedVariant.value?.stockLevel,
  );

  const galleryAssets = computed(() => {
    const assets = [
      ...(selectedVariant.value?.assets ?? []),
      ...(product.value?.assets ?? []),
    ];

    const seen = new Set();

    return assets.filter((asset) => {
      if (seen.has(asset.id)) return false;
      seen.add(asset.id);
      return true;
    });
  });

  function init(p: ProductDetail) {
    product.value = p;
    selectedOptions.value = {};

    if (!p.variants.length) return;

    const defaultVariant =
      p.variants.find((v) => v.stockLevel !== "OUT_OF_STOCK") ?? p.variants[0];

    if (!defaultVariant) return;

    for (const opt of defaultVariant.options) {
      selectedOptions.value[opt.group.id] = opt.id;
    }
  }

  function setOption(groupId: string, optionId: string) {
    selectedOptions.value[groupId] = optionId;
  }

  async function refreshStock() {
    const productId = product.value?.id;
    const variantId = selectedVariant.value?.id;

    if (!productId || !variantId) {
      liveStock.value = null;
      return;
    }

    const client = useUrqlClient();

    const { data, error } = await client
      .query(
        GetProductVariantStock,
        { productId, variantId },
        { requestPolicy: "network-only" },
      )
      .toPromise();

    if (error) throw error;

    liveStock.value = data?.product?.variantList.items?.[0]?.stockLevel ?? null;
  }

  return {
    product,
    selectedOptions,
    selectedVariant,
    optionGroups,
    hasOptions,
    stockLevel,
    galleryAssets,

    init,
    setOption,
    refreshStock,
  };
});
