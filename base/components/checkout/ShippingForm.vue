<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const orderStore = useOrderStore();
const state = reactive({
  shippingMethodId: "",
});

onMounted(async () => {
  await orderStore.getShippingMethods();
});

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  if (!state.shippingMethodId) return;

  await orderStore.setShippingMethod(event.shippingMethodId);

  if (orderStore.error) {
    useToast().add({
      title: "Error",
      description: orderStore.error,
      color: "error",
    });
    return;
  }

  emit("success");
}
</script>

<template>
  <UForm :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Shipping Method" name="shippingMethodId">
      <USelect
        v-model="state.shippingMethodId"
        :options="
          orderStore.shippingMethods?.map((m) => ({
            label: `${m.name} - ${m.description}`,
            value: m.id,
          }))
        "
      />
    </UFormField>

    <UButton type="submit">Continue</UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
