<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import { LoginForm } from "#layers/nuxtless/validators/loginForm";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();

const orderStore = useOrderStore();
const customerStore = useCustomerStore();
const authStore = useAuthStore();

const { error } = storeToRefs(authStore);

const { fetchOrder } = orderStore;
const { fetchCustomer } = customerStore;
const { login } = authStore;

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<LoginForm>) {
  await login(event.data.email, event.data.password);

  if (error.value) {
    toast.add({
      title: t("messages.account.loginFail"),
      description: t("messages.general.generalMessage"),
      color: "error",
    });
    return;
  }

  await fetchOrder();
  await fetchCustomer();

  toast.add({
    title: t("messages.account.loginSuccess"),
    description: t("messages.account.successMessage"),
    color: "success",
  });

  emit("success");
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
