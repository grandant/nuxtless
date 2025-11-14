<script setup lang="ts">
import { ResetPasswordForm } from "~~/src/base/validators/resetPasswordForm";

import type { FormSubmitEvent } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();
const token = route.query.token as string;
const { t } = useI18n();
const localePath = useLocalePath();

const { resetPassword } = useCustomerStore();
const toast = useToast();

const state = shallowReactive({
  password: "",
  confirmPassword: "",
});

async function onSubmit(event: FormSubmitEvent<ResetPasswordForm>) {
  if (!token) {
    toast.add({
      title: t("messages.error.resetFail"),
      description: t("messages.error.invalidPasswordResetLink"),
      color: "error",
    });
    return;
  }

  const result = await resetPassword(token, event.data.password);

  if (result && "id" in result) {
    toast.add({
      title: t("messages.account.resetSuccess"),
      description: t("messages.account.resetMessage"),
      color: "success",
    });
    router.push(localePath("/account/login"));
  } else if (result && "errorCode" in result) {
    toast.add({
      title: "Error",
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
    :schema="ResetPasswordForm"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      :label="t('messages.account.newPassword')"
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
      :label="t('messages.account.confirmNewPassword')"
      name="confirmPassword"
      size="xl"
    >
      <UInput
        v-model="state.confirmPassword"
        type="password"
        :placeholder="t('messages.account.enterPassword')"
        class="w-full"
      />
    </UFormField>

    <UButton size="xl" loading-auto class="w-full justify-center" type="submit">
      {{ t("messages.account.resetPassword") }}
    </UButton>
  </UForm>
</template>

<style lang="css" scoped></style>
