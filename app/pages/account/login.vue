<script setup lang="ts">
definePageMeta({
  alias: ["/login"],
});

const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const submitted = ref(false);
const loading = ref(true);

watch(submitted, (v) => {
  if (v) {
    router.push(localePath("/account"));
  }
});

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
          {{ t("messages.pages.account.signIn") }}
        </h1>
        <p>
          {{ t("messages.account.noAccount") }}
          <ULink :to="localePath('/account/register')" class="underline">
            {{ t("messages.account.accountRegister") }}.
          </ULink>
        </p>
      </header>

      <UPageSection :ui="{ container: 'pt-0 lg:pt-0 pb-12' }">
        <AccountLoginForm
          class="mx-auto flex w-full flex-col sm:w-xs md:w-sm"
          @success="submitted = true"
        />
      </UPageSection>
    </UPage>
  </UContainer>
</template>

<style lang="css" scoped></style>
