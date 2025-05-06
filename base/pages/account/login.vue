<script setup lang="ts">
const localePath = useLocalePath();

const submitted = ref(false);

watch(submitted, async (v) => {
  if (v) {
    console.log("Submitted");
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
