<script setup lang="ts">
import { AddressForm } from "~~/src/base/validators/addressForm";

import type { FormSubmitEvent } from "@nuxt/ui";
import type { ActiveCustomerDetail } from "~~/src/types/customer";
import type { CheckoutState } from "~~/src/types/general";

const isSubmitted = defineModel<boolean>({ default: false });

const { t } = useI18n();
const addressForm = useTemplateRef("addressForm");
const submitAddress = () => addressForm.value?.submit();
defineExpose({ submitAddress });

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

const checkoutState = useState<CheckoutState>("checkoutState");
const state = checkoutState.value.addressForm;

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

async function onSubmit(event: FormSubmitEvent<AddressForm>) {
  if (!isAuthenticated.value) {
    await orderStore.setCustomerForOrder({
      firstName: event.data.firstName,
      lastName: event.data.lastName,
      emailAddress: event.data.emailAddress,
    });
  }

  await orderStore.setOrderShippingAddress({
    streetLine1: '',
    city: state.city,
    countryCode: state.countryCode,
  });

  if (!orderStore.error) isSubmitted.value = true;
}

async function onError() {
  isSubmitted.value = false;
}

onMounted(() => {
  isMounted.value = true;

  if (isAuthenticated.value && activeCustomer.value) {
    const c = activeCustomer.value;

    state.city = c.addresses?.[0]?.city ?? "";
    state.countryCode = c.addresses?.[0]?.country?.code ?? "BG";
  }
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
    @error="onError"
  >

    <div class="col-span-2 flex flex-col gap-4 lg:flex-row">
      <UFormField
        :label="t('messages.billing.city')"
        name="city"
        class="w-full lg:w-1/3"
        size="xl"
      >
        <UInput v-model="state.city" class="w-full" type="text" />
      </UFormField>

      <UFormField
        :label="t('messages.billing.country')"
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
