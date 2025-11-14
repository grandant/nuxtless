<script setup lang="ts">
definePageMeta({
  alias: ["/password-reset"],
});

const route = useRoute();
const token = route.query.token as string;
const { t } = useI18n();
const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);

onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo(localePath("/account"), { replace: true });
    return;
  }

  if (!token) {
    navigateTo(localePath("/account/request-password-reset"), {
      replace: true,
    });
    return;
  }

  loading.value = false;
});
</script>

<template>
  <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />
  <main v-else class="container mt-14">
    <header
      class="mb-8 flex flex-col items-center"
      aria-labelledby="reset-password-heading"
    >
      <LogoElement
        logo-light="/logo-full.svg"
        logo-dark="/logo-full.svg"
        :width="100"
        aria-hidden="true"
        focusable="false"
        class="mb-4"
      />
      <h1 id="reset-password-heading" class="text-2xl font-bold">
        {{ t("messages.account.updatePassword") }}
      </h1>
      <p>
        {{ t("messages.account.rememberPassword") }}
        <ULink :to="localePath('/account/login')" class="underline">
          {{ t("messages.account.backToLogin") }}
        </ULink>
      </p>
    </header>

    <AccountResetPasswordForm
      class="mx-auto mb-14 flex w-full flex-col sm:w-xs md:w-sm"
    />
  </main>
</template>

<style lang="css" scoped></style>
