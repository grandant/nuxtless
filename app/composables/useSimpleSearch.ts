import { refDebounced } from "@vueuse/core";

import { SearchProducts } from "#layers/nuxtless/gql/queries/product";

import type { SearchResult } from "#layers/nuxtless/types";

export function useSimpleSearch() {
  const term = ref("");
  const debouncedTerm = refDebounced(term, 1000, { maxWait: 5000 });

  const variables = computed(() => ({
    term: debouncedTerm.value,
    take: 12,
  }));

  const { data, fetching, error } = useQuery({
    query: SearchProducts,
    variables,
    pause: computed(() => debouncedTerm.value.length < 2),
  });

  const results = computed<SearchResult>(() => data.value?.search.items ?? []);

  return {
    term,
    results,
    pending: fetching,
    error,
  };
}
