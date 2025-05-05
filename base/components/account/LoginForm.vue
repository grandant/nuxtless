<script setup lang="ts">
import { LoginForm } from "~~/base/validators/loginForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const state = reactive({
  email: "",
  password: "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<LoginForm>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
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
