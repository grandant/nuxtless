<script setup lang="ts" size="xl">
import { RegisterForm } from "~~/layers/base/validators/registerForm";

import type { FormSubmitEvent } from "@nuxt/ui";

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const { register } = useCustomerStore();

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function onSubmit(event: FormSubmitEvent<RegisterForm>) {
  const result = await register({
    firstName: event.data.firstName,
    lastName: event.data.lastName,
    emailAddress: event.data.email,
    password: event.data.password,
  });

  if (result && "success" in result && result.success) {
    await navigateTo(localePath("/account/login"), { replace: true });
    toast.add({
      title: t("messages.account.registerSuccess"),
      description: t("messages.account.registerSuccessMessage"),
      color: "success",
    });
  } else if (result && "message" in result) {
    toast.add({
      title: t("messages.account.registerFail"),
      description: result.message,
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
    :schema="RegisterForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      :label="t('messages.account.firstName')"
      name="firstName"
      size="xl"
    >
      <UInput
        v-model="state.firstName"
        type="text"
        :placeholder="t('messages.account.firstNamePlaceholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('messages.account.lastName')"
      name="lastName"
      size="xl"
    >
      <UInput
        v-model="state.lastName"
        type="text"
        :placeholder="t('messages.account.lastNamePlaceholder')"
        class="w-full"
      />
    </UFormField>

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
        :placeholder="t('messages.account.enterPassword')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('messages.account.confirmPassword')"
      name="confirmPassword"
      size="xl"
    >
      <UInput
        v-model="state.confirmPassword"
        type="password"
        :placeholder="t('messages.account.confirmPassword')"
        class="w-full"
      />
    </UFormField>

    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      {{ t("messages.account.register") }}
    </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
