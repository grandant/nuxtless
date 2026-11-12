export function usePagination(take: number) {
  const route = useRoute();
  const page = computed(() => Number(route.query.page) || 1);
  const skip = computed(() => (page.value - 1) * take);

  const to = (newPage: number) => ({
    name: route.name!,
    params: route.params,
    query: { ...route.query, page: newPage },
  });

  return { take, page, skip, to };
}
