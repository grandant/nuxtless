import type { ProductDetail } from "~~/types/product";

export const useProductStore = defineStore("product", () => {
  const product = ref<ProductDetail>(null);
  const selectedOptions = reactive<Record<string, string>>({});

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

  const hasVariants = computed(
    () => (product.value?.variants?.length ?? 0) > 1,
  );

  const selectedVariant = computed(
    () =>
      product.value?.variants.find((v) =>
        v.options.every((opt) => selectedOptions[opt.group.id] === opt.id),
      ) ?? null,
  );

  const liveStock = ref<string | null>(null);
  const stockLevel = computed(
    () => liveStock.value ?? selectedVariant.value?.stockLevel,
  );

  const galleryAssets = computed(() => {
    const variantAssets = selectedVariant.value?.assets ?? [];
    const productAssets = product.value?.assets ?? [];
    return variantAssets.length > 0 ? variantAssets : productAssets;
  });

  function init(p: ProductDetail) {
    product.value = p;
    Object.assign(selectedOptions, {});
    if (!p?.variants?.length) return;

    const defaultVariant =
      p.variants.find((v) => v.stockLevel !== "OUT_OF_STOCK") ?? p.variants[0];

    if (!defaultVariant) return;

    for (const opt of defaultVariant.options) {
      selectedOptions[opt.group.id] = opt.id;
    }
  }

  function setOption(groupId: string, optionId: string) {
    selectedOptions[groupId] = optionId;
  }

  async function refreshStock() {
    const productId = product.value?.id;
    const variantId = selectedVariant.value?.id;

    if (!productId || !variantId) {
      liveStock.value = null;
      return;
    }

    const { product: variantStock } = await GqlGetProductVariantStock({
      productId,
      variantId,
    });

    liveStock.value = variantStock?.variantList.items?.[0]?.stockLevel ?? null;
  }

  return {
    product,
    selectedOptions,
    optionGroups,
    hasVariants,
    selectedVariant,
    stockLevel,
    galleryAssets,
    init,
    setOption,
    refreshStock,
  };
});
