<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();
const submitted = ref(false);

watch(submitted, (v) => {
  if (v) {
    router.push("/account");
  }
});
</script>

<template>
  <main class="">
    <h1 class="">Sign in to your account</h1>
    <p class="">
      Don’t have an account?
      <ULink :to="localePath('/account/register')"> Register here </ULink>
    </p>

    <AccountLoginForm @success="submitted = true" />
    <ULink :to="localePath('/account/request-password-reset')">
      Forgotten Password?
    </ULink>
  </main>
</template>

<style lang="css" scoped></style>
