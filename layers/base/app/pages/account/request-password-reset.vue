<script setup lang="ts">
definePageMeta({
  alias: ["/request-password-reset"],
});

const { t } = useI18n();
const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);
const submitted = ref(false);

onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo(localePath("/account"), { replace: true });
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
      aria-labelledby="reset-heading"
    >
      <LogoElement
        logo-light="/logo-full.svg"
        logo-dark="/logo-full.svg"
        :width="100"
        aria-hidden="true"
        focusable="false"
        class="mb-4"
      />
      <h1 id="reset-heading" class="text-2xl font-bold">
        {{ t("messages.pages.account.requestPasswordReset") }}
      </h1>
      <p>
        {{ t("messages.account.rememberPassword") }}
        <ULink :to="localePath('/account/login')" class="underline">
          {{ t("messages.account.backToLogin") }}
        </ULink>
      </p>
    </header>

    <section class="mb-14 flex flex-col items-center">
      <div class="mx-auto flex w-full flex-col sm:w-xs md:w-sm">
        <p v-if="submitted" class="text-center">
          {{ t("messages.account.ifRegistered") }}
        </p>
        <AccountRequestPasswordResetForm v-else @success="submitted = true" />
      </div>
    </section>
  </main>
</template>
