<script setup lang="ts">
import { ResetPasswordForm } from "~~/base/validators/resetPasswordForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();
const token = route.query.token as string;

if (!token) {
  router.replace("/account/request-password-reset");
}

const { resetPassword } = useCustomerStore();
const toast = useToast();

const state = reactive({
  password: "",
  confirmPassword: "",
});

async function onSubmit(event: FormSubmitEvent<ResetPasswordForm>) {
  if (!token) {
    toast.add({
      title: "Invalid Link",
      description: "Invalid or expired link. Please request a new one.",
      color: "error",
    });
    return;
  }

  const result = await resetPassword(token, event.data.password);

  if (result && "id" in result) {
    toast.add({
      title: "Success",
      description: "Your password has been reset.",
      color: "success",
    });
    router.push("/account/login");
  } else if (result && "errorCode" in result) {
    toast.add({
      title: "Error",
      description: result.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Error",
      description: "Something went wrong.",
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="ResetPasswordForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UFormField label="Confirm Password" name="confirmPassword">
      <UInput v-model="state.confirmPassword" type="password" />
    </UFormField>

    <UButton type="submit">Reset Password</UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
