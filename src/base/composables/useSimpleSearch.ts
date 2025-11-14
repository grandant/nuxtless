import { refDebounced } from "@vueuse/core";
import type { SearchResult } from "~~/types/product";

export function useSimpleSearch() {
  const term = ref("");
  const debouncedTerm = refDebounced(term, 1000, { maxWait: 5000 });

  const { data, pending, error, execute } = useAsyncGql(
    "SearchProducts",
    {
      term: debouncedTerm,
      take: 12,
    },
    { immediate: false },
  );

  watch(debouncedTerm, (val) => {
    if (val.length >= 2) execute();
  });

  const results: ComputedRef<SearchResult> = computed(
    () => data.value?.search.items ?? [],
  );

  return {
    term,
    results,
    pending,
    error,
  };
}
