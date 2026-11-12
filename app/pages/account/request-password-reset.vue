<script setup lang="ts">
definePageMeta({
  alias: ["/request-password-reset"],
});

const { t } = useI18n();
const localePath = useLocalePath();

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

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
  <UContainer>
    <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />

    <UPage v-else>
      <header class="mt-14 mb-8 flex flex-col items-center">
        <LogoElement
          aria-hidden="true"
          focusable="false"
          wrapper-class="w-1/2 h-[125px] justify-center"
          class="mb-4"
        />
        <h1 class="text-2xl font-bold">
          {{ t("messages.pages.account.requestPasswordReset") }}
        </h1>
        <p>
          {{ t("messages.account.rememberPassword") }}
          <ULink :to="localePath('/account/login')" class="underline">
            {{ t("messages.account.backToLogin") }}
          </ULink>
        </p>
      </header>

      <UPageSection :ui="{ container: 'pt-0 lg:pt-0 pb-12' }">
        <div class="mx-auto flex w-full flex-col sm:w-xs md:w-sm">
          <p v-if="submitted" class="text-center">
            {{ t("messages.account.ifRegistered") }}
          </p>
          <AccountRequestPasswordResetForm v-else @success="submitted = true" />
        </div>
      </UPageSection>
    </UPage>
  </UContainer>
</template>
