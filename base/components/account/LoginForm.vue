<script setup lang="ts">
import { LoginForm } from "~~/base/validators/loginForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { locale } = useI18n();
const localePath = useLocalePath();
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
    <UFormField label="Email" name="email" size="xl">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="Enter your email"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Password" name="password" size="xl">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="Enter your password"
        class="w-full"
      />
    </UFormField>

    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      Login
    </UButton>
    <ULink
      :to="localePath('/account/request-password-reset')"
      class="block text-center underline"
    >
      Forgotten Password?
    </ULink>
  </UForm>
</template>

<style lang="css" scoped></style>
