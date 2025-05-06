<script setup lang="ts">
import { LoginForm } from "~~/base/validators/loginForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { locale } = useI18n();
const orderStore = useOrderStore();

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

  if (result) {
    emit("success");
    await orderStore.fetchOrder();
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
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit"> Login </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
