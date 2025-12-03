<script setup lang="ts">
import { LoginForm } from "~~/src/base/validators/loginForm";

import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { t, locale } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const { fetchOrder } = useOrderStore();
const { fetchCustomer } = useCustomerStore();
const { setUser } = useAuthStore();
const { customer } = storeToRefs(useCustomerStore());

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<LoginForm>) {
  const result = await useGqlSession(
    locale.value,
    gqlHost,
    channelToken,
    "login",
    {
      emailAddress: event.data.email,
      password: event.data.password,
      rememberMe: true,
    },
  );

  if (result && "identifier" in result) {
    await fetchOrder();
    await fetchCustomer();

    setUser({
      id: customer.value.id,
      email: customer.value.emailAddress,
    });

    toast.add({
      title: t("messages.account.loginSuccess"),
      description: t("messages.account.successMessage"),
      color: "success",
    });

    emit("success");
  } else if (result && "errorCode" in result) {
    toast.add({
      title: t("messages.account.loginFail"),
      description: t("messages.account.failMessage"),
      color: "error",
    });
  } else {
    toast.add({
      title: t("messages.error.general"),
      description: t("messages.error.generalMessage"),
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="LoginForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField :label="t('messages.account.email')" name="email" size="xl">
      <UInput
        v-model="state.email"
        type="email"
        :placeholder="t('messages.account.emailPlaceholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('messages.account.password')"
      name="password"
      size="xl"
    >
      <UInput
        v-model="state.password"
        type="password"
        :placeholder="t('messages.account.passwordPlaceholder')"
        class="w-full"
      />
    </UFormField>

    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      {{ t("messages.account.login") }}
    </UButton>
    <ULink
      :to="localePath('/account/request-password-reset')"
      class="block text-center underline"
    >
      {{ t("messages.account.forgotPassword") }}
    </ULink>
  </UForm>
</template>

<style lang="css" scoped></style>
