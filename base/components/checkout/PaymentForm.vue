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

const state = reactive({
  code: "", // paymentMethods.value[0]?.value,
});

const paymentForm = useTemplateRef("paymentForm");

watch(
  () => props.triggerSubmit,
  (val) => {
    if (val) paymentForm.value?.submit();
  },
);

watch(
  () => state.code,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      await orderStore.addPaymentToOrder({
        method: state?.code,
        metadata: {},
      });
    }
  },
);

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
    class="mt-4 space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Payment Method" class="text-md" name="code">
      <URadioGroup
        v-model="state.code"
        indicator="hidden"
        variant="table"
        orientation="vertical"
        :items="paymentMethods"
        :ui="{ item: 'w-full' }"
        class="block lg:hidden"
      />
      <URadioGroup
        v-model="state.code"
        indicator="hidden"
        variant="table"
        orientation="horizontal"
        :items="paymentMethods"
        :ui="{ item: 'w-full' }"
        class="hidden lg:block"
      />
    </UFormField>
  </UForm>
</template>

<style lang="css" scoped></style>
