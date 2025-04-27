<script setup lang="ts">
import { RegisterForm } from "~~/base/validators/registerForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const { register } = useCustomerStore();

const state = reactive({
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<RegisterForm>) {
  const success = await register({
    firstName: event.data.firstName,
    lastName: event.data.lastName,
    emailAddress: event.data.emailAddress,
    password: event.data.password,
  });

  if (success) {
    toast.add({
      title: "Registration Successful",
      description: "Please check your email to verify your account.",
      color: "success",
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
    <UFormField label="First Name" name="firstName">
      <UInput v-model="state.firstName" />
    </UFormField>

    <UFormField label="Last Name" name="lastName">
      <UInput v-model="state.lastName" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput v-model="state.emailAddress" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UFormField label="Confirm Password" name="confirmPassword">
      <UInput v-model="state.confirmPassword" type="password" />
    </UFormField>

    <UButton type="submit"> Register </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
