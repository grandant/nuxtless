<script setup lang="ts">
import { LoginForm } from "~~/base/validators/loginForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { locale } = useI18n();
const toast = useToast();
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

  if (result && "identifier" in result) {
    toast.add({
      title: "Login Successful",
      description: "You logged in into your account.",
      color: "success",
    });
    emit("success");
    await orderStore.fetchOrder();
  } else if (result && "errorCode" in result) {
    toast.add({
      title: "Login Failed",
      description: result.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Something went wrong",
      description: "Please try again later or contact support.",
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
