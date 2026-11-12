export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const customerStore = useCustomerStore();
  const orderStore = useOrderStore();

  const { customer } = storeToRefs(customerStore);

  const { setUser, clearSession } = authStore;
  const { fetchCustomer } = customerStore;
  const { fetchOrder } = orderStore;

  await Promise.all([fetchCustomer(), fetchOrder()]);

  if (customerStore.error) return;

  if (customer.value) {
    setUser({
      id: customer.value.id,
      email: customer.value.emailAddress,
    });
  } else {
    clearSession();
  }
});
