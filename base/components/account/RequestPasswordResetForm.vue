<script setup lang="ts">
import { RequestPasswordResetForm } from "~~/base/validators/requestPasswordResetForm";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { requestPasswordReset } = useCustomerStore();
const toast = useToast();

const state = reactive({
  emailAddress: "",
});

async function onSubmit(event: FormSubmitEvent<RequestPasswordResetForm>) {
  const result = await requestPasswordReset(event.data.emailAddress);

  if (result && "success" in result && result.success) {
    emit("success");
  } else {
    toast.add({
      title: "Reset Failed",
      description:
        result && "message" in result ? result.message : "Something went wrong",
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="RequestPasswordResetForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Email Address" name="emailAddress">
      <UInput v-model="state.emailAddress" type="email" />
    </UFormField>

    <UButton type="submit">Send Reset Link</UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
