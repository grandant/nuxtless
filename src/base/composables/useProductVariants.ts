import type { ProductDetail } from "~~/types/product";

export function useProductVariants(product: ProductDetail) {
  if (!product?.variants?.length) {
    return {
      optionGroups: computed(() => []),
      selectedOptions: reactive<Record<string, string>>({}),
      selectedVariant: computed(() => undefined),
    };
  }

  const optionGroups = computed(() => {
    const groups = new Map<string, Set<string>>();

    for (const variant of product.variants) {
      for (const option of variant.options) {
        if (!groups.has(option.group.name)) {
          groups.set(option.group.name, new Set());
        }
        groups.get(option.group.name)!.add(option.name);
      }
    }

    return Array.from(groups.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  });

  const selectedOptions = reactive<Record<string, string>>({});

  watchEffect(() => {
    for (const group of optionGroups.value) {
      if (!selectedOptions[group.name]) {
        selectedOptions[group.name] = group.values[0] ?? "";
      }
    }
  });

  const selectedVariant = computed(() => {
    return product.variants.find((variant) =>
      variant.options.every(
        (opt) => selectedOptions[opt.group.name] === opt.name,
      ),
    );
  });

  return {
    optionGroups,
    selectedOptions,
    selectedVariant,
  };
}
