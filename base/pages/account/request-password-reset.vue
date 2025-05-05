<script setup lang="ts">
const submitted = ref(false);
</script>

<template>
  <main class="prose mx-auto p-4">
    <h1>Reset Your Password</h1>

    <p v-if="submitted">
      If an account exists with that email, a reset link has been sent.
    </p>

    <ResetPasswordRequestForm v-else @success="submitted = true" />
  </main>
</template>

<style lang="css" scoped></style>
