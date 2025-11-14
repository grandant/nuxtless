<script setup lang="ts">
import { RequestPasswordResetForm } from "~~/src/base/validators/requestPasswordResetForm";

import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { t } = useI18n();
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
      title: t("messages.error.resetFail"),
      description:
        result && "message" in result
          ? result.message
          : t("messages.error.general"),
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
    <UFormField
      :label="t('messages.account.email')"
      name="emailAddress"
      size="xl"
    >
      <UInput
        v-model="state.emailAddress"
        type="email"
        :placeholder="t('messages.account.emailPlaceholder')"
        class="w-full"
      />
    </UFormField>

    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      {{ t("messages.account.sendPasswordResetEmail") }}
    </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
