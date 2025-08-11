<script setup lang="ts" size="xl">
import { RegisterForm } from "~~/base/validators/registerForm";
import type { FormSubmitEvent } from "@nuxt/ui";

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
      title: "Registration Successful",
      description: "Please check your email to verify your account.",
      color: "success",
    });
  } else if (result && "message" in result) {
    toast.add({
      title: "Registration Failed",
      description: result.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Registration Failed",
      description: "An unexpected error occurred.",
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
    <UFormField label="First Name" name="firstName" size="xl">
      <UInput
        v-model="state.firstName"
        type="text"
        placeholder="Enter your email"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Last Name" name="lastName" size="xl">
      <UInput
        v-model="state.lastName"
        type="text"
        placeholder="Enter your email"
        class="w-full"
      />
    </UFormField>

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
        placeholder="Enter your email"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Confirm Password" name="confirmPassword" size="xl">
      <UInput
        v-model="state.confirmPassword"
        type="password"
        placeholder="Enter your email"
        class="w-full"
      />
    </UFormField>

    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      Register
    </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
