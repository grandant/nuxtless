<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { ActiveCustomerDetail } from "~~/types/customer";

import { AddressForm } from "~~/base/validators/addressForm";

const { triggerSubmit } = defineProps<{ triggerSubmit: boolean }>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { isAuthenticated } = storeToRefs(useAuthStore());
const orderStore = useOrderStore();
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const isMounted = ref(false);

if (!customer.value || !("phoneNumber" in customer.value)) {
  await fetchCustomer("detail");
}

// Safe: We fetch with "detail" above. Customer.value should always be ActiveCustomerDetail.
const activeCustomer = computed(() => customer.value as ActiveCustomerDetail);

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

watch(
  [isAuthenticated, activeCustomer, isMounted],
  ([auth, customer, mounted]) => {
    if (auth && customer && mounted) {
      state.firstName = customer.firstName || "";
      state.lastName = customer.lastName || "";
      state.emailAddress = customer.emailAddress || "";
      state.streetLine1 = customer.addresses?.[0]?.streetLine1 || "";
      state.city = customer.addresses?.[0]?.city || "";
      state.postalCode = customer.addresses?.[0]?.postalCode || "";
      state.countryCode = customer.addresses?.[0]?.country?.code || "BG";

      syncOrderShippingAddress(state);
    }
  },
  { once: true },
);

watch(
  () => triggerSubmit,
  (val) => {
    if (val) addressForm.value?.submit();
  },
);

async function onSubmit(event: FormSubmitEvent<AddressForm>) {
  if (!isAuthenticated.value) {
    await orderStore.setCustomerForOrder({
      firstName: event.data.firstName,
      lastName: event.data.lastName,
      emailAddress: event.data.emailAddress,
    });
  }

  syncOrderShippingAddress(state);

  if (!orderStore.error) emit("success");
}

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <UForm
    ref="addressForm"
    :schema="AddressForm"
    :state="state"
    :disabled="!isMounted"
    class="grid grid-cols-2 gap-4"
    @submit="onSubmit"
  >
    <UFormField
      label="First Name"
      class="col-span-2 lg:col-span-1"
      name="firstName"
      size="xl"
    >
      <UInput v-model="state.firstName" class="w-full" type="text" />
    </UFormField>

    <UFormField
      label="Last Name"
      class="col-span-2 lg:col-span-1"
      name="lastName"
      size="xl"
    >
      <UInput v-model="state.lastName" class="w-full" type="text" />
    </UFormField>

    <UFormField label="Email" class="col-span-2" name="emailAddress" size="xl">
      <UInput
        v-model="state.emailAddress"
        :disabled="isAuthenticated && isMounted"
        class="w-full"
        type="email"
      />
    </UFormField>

    <UFormField label="Street" class="col-span-2" name="streetLine1" size="xl">
      <UInput v-model="state.streetLine1" class="w-full" type="text" />
    </UFormField>

    <UFormField label="Street" class="col-span-2" name="streetLine2" size="xl">
      <UInput v-model="state.streetLine2" class="w-full" type="text" />
    </UFormField>

    <div class="col-span-2 flex flex-col gap-4 lg:flex-row">
      <UFormField
        label="City"
        name="city"
        class="w-full lg:w-1/3"
        size="xl"
        @change="syncOrderShippingAddress(state)"
      >
        <UInput v-model="state.city" class="w-full" type="text" />
      </UFormField>

      <UFormField
        label="Postal Code"
        class="w-full lg:w-1/3"
        name="postalCode"
        size="xl"
        @change="syncOrderShippingAddress(state)"
      >
        <UInput v-model="state.postalCode" class="w-full" type="text" />
      </UFormField>

      <UFormField
        label="Country"
        name="country"
        class="w-full lg:w-1/3"
        size="xl"
      >
        <USelectMenu
          v-model="state.countryCode"
          value-key="code"
          :items="countries"
          class="w-full"
        />
      </UFormField>
    </div>
  </UForm>
</template>

<style lang="css" scoped></style>
