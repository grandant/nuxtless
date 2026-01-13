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
const { countryCodeDefault } = useAppConfig()
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
    fullName: `${state.firstName} ${state.lastName}`,
    streetLine1: state.streetLine1,
    city: state.city,
    postalCode: state.postalCode,
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
    state.firstName = c.firstName ?? "";
    state.lastName = c.lastName ?? "";
    state.emailAddress = c.emailAddress ?? "";
    state.streetLine1 = c.addresses?.[0]?.streetLine1 ?? "";
    state.city = c.addresses?.[0]?.city ?? "";
    state.postalCode = c.addresses?.[0]?.postalCode ?? "";
    state.countryCode = c.addresses?.[0]?.country?.code ?? countryCodeDefault;
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
    <UFormField
      :label="t('messages.billing.firstName')"
      class="col-span-2 lg:col-span-1"
      name="firstName"
      size="xl"
    >
      <UInput v-model="state.firstName" class="w-full" type="text" />
    </UFormField>

    <UFormField
      :label="t('messages.billing.lastName')"
      class="col-span-2 lg:col-span-1"
      name="lastName"
      size="xl"
    >
      <UInput v-model="state.lastName" class="w-full" type="text" />
    </UFormField>

    <UFormField
      :label="t('messages.billing.email')"
      class="col-span-2"
      name="emailAddress"
      size="xl"
    >
      <UInput
        v-model="state.emailAddress"
        :disabled="isAuthenticated && isMounted"
        class="w-full"
        type="email"
      />
    </UFormField>

    <UFormField
      :label="t('messages.billing.address1')"
      class="col-span-2"
      name="streetLine1"
      size="xl"
    >
      <UInput v-model="state.streetLine1" class="w-full" type="text" />
    </UFormField>

    <UFormField
      :label="t('messages.billing.address2')"
      class="col-span-2"
      name="streetLine2"
      size="xl"
    >
      <UInput v-model="state.streetLine2" class="w-full" type="text" />
    </UFormField>

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
        :label="t('messages.billing.zip')"
        class="w-full lg:w-1/3"
        name="postalCode"
        size="xl"
      >
        <UInput v-model="state.postalCode" class="w-full" type="text" />
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
