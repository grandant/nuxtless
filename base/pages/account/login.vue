<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <main class="">
    <h1 class="">Sign in to your account</h1>
    <p class="">
      Don’t have an account?
      <ULink :to="localePath('/account/register')"> Register here </ULink>
    </p>

    <AccountLoginForm />
    <ULink :to="localePath('/account/register')"> Forgotten Password? </ULink>
  </main>
</template>

<style lang="css" scoped></style>
