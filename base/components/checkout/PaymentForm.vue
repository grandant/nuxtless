<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { PaymentForm } from "~~/base/validators/paymentForm";

const props = defineProps<{ triggerSubmit: boolean }>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const orderStore = useOrderStore();
await orderStore.getPaymentMethods();
const { paymentMethods: paymentMethodsData } = storeToRefs(useOrderStore());

const paymentMethods = computed(
  () =>
    paymentMethodsData.value?.map((m) => ({
      label: m.name,
      value: m.code,
    })) ?? [],
);

const paymentForm = useTemplateRef("paymentForm");

watch(
  () => props.triggerSubmit,
  (val) => {
    if (val) paymentForm.value?.submit();
  },
);

const state = reactive({
  code: "",
});

async function onSubmit(event: FormSubmitEvent<PaymentForm>) {
  if (!state.code) return;

  await orderStore.transitionToState("ArrangingPayment");

  await orderStore.addPaymentToOrder({
    method: event.data.code,
    metadata: {},
  });

  if (!orderStore.error) emit("success");
}
</script>

<template>
  <UForm
    ref="paymentForm"
    :schema="PaymentForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Payment Method" name="code">
      <USelect
        v-model="state.code"
        :items="
          paymentMethods?.map((m) => ({
            label: `${m.label}`,
            value: m.value,
          }))
        "
      />
    </UFormField>
  </UForm>
</template>

<style lang="css" scoped></style>
