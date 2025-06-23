import type { ProductDetail } from "~~/types/product";

export const useProductStore = defineStore("product", () => {
  const product = ref<ProductDetail>(null);
  const selectedOptions = reactive<Record<string, string>>({});

  const optionGroups = computed(() => {
    if (!product.value?.variants?.length) return [];

    const groups = new Map<string, Set<string>>();
    for (const variant of product.value.variants) {
      for (const option of variant.options) {
        if (!groups.has(option.group.name))
          groups.set(option.group.name, new Set());
        groups.get(option.group.name)!.add(option.name);
      }
    }

    return Array.from(groups.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  });

  const hasVariants = computed(
    () => product.value?.variants && product.value.variants.length > 1,
  );

  const selectedVariant = computed(() => {
    return product.value?.variants.find((variant) =>
      variant.options.every(
        (opt) => selectedOptions[opt.group.name] === opt.name,
      ),
    );
  });

  const stockLevel = computed(() => selectedVariant.value?.stockLevel);

  const galleryAssets = computed(() => {
    const variantAssets = selectedVariant.value?.assets ?? [];
    const productAssets = product.value?.assets ?? [];
    return variantAssets.length > 0 ? variantAssets : productAssets;
  });

  function init(p: ProductDetail) {
    product.value = p;
    for (const group of optionGroups.value) {
      selectedOptions[group.name] ||= group.values[0] ?? "";
    }
  }

  function setOption(group: string, value: string) {
    selectedOptions[group] = value;
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
  };
});
