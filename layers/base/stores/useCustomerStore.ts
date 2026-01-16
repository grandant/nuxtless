export const useCustomerStore = defineStore("customer", () => {
  const base = useCustomerLogic();
  return {
    ...base
  };
});
