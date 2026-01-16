<script setup lang="ts">
definePageMeta({
  alias: ["/register"],
});

const { t } = useI18n();
const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);

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
      aria-labelledby="register-heading"
    >
      <LogoElement
        logo-light="/logo-full.svg"
        logo-dark="/logo-full.svg"
        :width="100"
        aria-hidden="true"
        focusable="false"
        class="mb-4"
      />
      <h1 id="register-heading" class="text-2xl font-bold">
        {{ t("messages.account.accountRegister") }}
      </h1>
      <p>
        {{ t("messages.account.hasAccount") }}
        <ULink :to="localePath('/account/login')" class="underline">
          {{ t("messages.account.loginToAccount") }}.
        </ULink>
      </p>
    </header>

    <AccountRegisterForm
      class="mx-auto mb-14 flex w-full flex-col sm:w-xs md:w-sm"
    />
  </main>
</template>
