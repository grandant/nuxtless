<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <main class="">
    <h1 class="">Register an account</h1>
    <p class="">
      Already have an account?
      <ULink :to="localePath('/account/login')"> Login here. </ULink>
    </p>

    <AccountRegisterForm />
  </main>
</template>

<style lang="css" scoped></style>
