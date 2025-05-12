<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { AddressForm } from "~~/base/validators/addressForm";

const { triggerSubmit } = defineProps<{ triggerSubmit: boolean }>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const toast = useToast();
const orderStore = useOrderStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { setCustomerForOrder } = useCustomerStore();

const { data: countriesData } = await useAsyncGql("GetChannelCountries");

const countries = computed(
  () =>
    countriesData.value?.activeChannel?.defaultShippingZone?.members.map(
      (c) => ({
        label: c.name,
        code: c.code,
      }),
    ) ?? [],
);

const addressForm = useTemplateRef("addressForm");

watch(
  () => triggerSubmit,
  (val) => {
    if (val) addressForm.value?.submit();
  },
);

const state = reactive({
  firstName: "",
  lastName: "",
  emailAddress: "",
  streetLine1: "",
  streetLine2: "",
  city: "",
  postalCode: "",
  countryCode: "BG",
  billingSameAsShipping: true,
});

async function onSubmit(event: FormSubmitEvent<AddressForm>) {
  try {
    if (!isAuthenticated.value) {
      const result = await setCustomerForOrder({
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        emailAddress: event.data.emailAddress,
      });

      if (result && "errorCode" in result) {
        toast.add({
          title: "Checkout Failed",
          description: result.message,
          color: "error",
        });
        return;
      }
    }

    await orderStore.setOrderShippingAddress({
      firstName: event.data.firstName,
      lastName: event.data.lastName,
      emailAddress: event.data.emailAddress,
      streetLine1: event.data.streetLine1,
      streetLine2: event.data.streetLine2,
      city: event.data.city,
      postalCode: event.data.postalCode,
      countryCode: event.data.countryCode,
      billingSameAsShipping: true,
    });

    if (orderStore.error) {
      toast.add({
        title: "Checkout Failed",
        description: orderStore.error,
        color: "error",
      });
      return;
    }

    emit("success");
  } catch (error) {
    console.error("Checkout error:", error);
    toast.add({
      title: "Checkout Failed",
      description: "If the issue persists, please contact support.",
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    ref="addressForm"
    :schema="AddressForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="First Name" name="firstName">
      <UInput v-model="state.firstName" type="text" />
    </UFormField>

    <UFormField label="Last Name" name="lastName">
      <UInput v-model="state.lastName" type="text" />
    </UFormField>

    <UFormField v-if="!isAuthenticated" label="Email" name="emailAddress">
      <UInput v-model="state.emailAddress" type="email" />
    </UFormField>

    <UFormField label="Street" name="streetLine1">
      <UInput v-model="state.streetLine1" type="text" />
    </UFormField>

    <UFormField label="Street" name="streetLine2">
      <UInput v-model="state.streetLine2" type="text" />
    </UFormField>

    <UFormField label="City" name="city">
      <UInput v-model="state.city" type="text" />
    </UFormField>

    <UFormField label="Postal Code" name="postalCode">
      <UInput v-model="state.postalCode" type="text" />
    </UFormField>

    <UFormField label="Country" name="country">
      <USelectMenu
        v-model="state.countryCode"
        value-key="code"
        :items="countries"
      />
    </UFormField>
  </UForm>
</template>

<style lang="css" scoped></style>
