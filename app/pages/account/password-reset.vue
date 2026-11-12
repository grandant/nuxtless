<script setup lang="ts">
definePageMeta({
  alias: ["/password-reset"],
});

const route = useRoute();
const token = route.query.token as string;
const { t } = useI18n();
const localePath = useLocalePath();

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

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
          {{ t("messages.account.updatePassword") }}
        </h1>
        <p>
          {{ t("messages.account.rememberPassword") }}
          <ULink :to="localePath('/account/login')" class="underline">
            {{ t("messages.account.backToLogin") }}
          </ULink>
        </p>
      </header>

      <UPageSection :ui="{ container: 'pt-0 lg:pt-0 pb-12' }">
        <AccountResetPasswordForm
          class="mx-auto flex w-full flex-col sm:w-xs md:w-sm"
        />
      </UPageSection>
    </UPage>
  </UContainer>
</template>

<style lang="css" scoped></style>
