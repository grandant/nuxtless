<script setup lang="ts">
import type { ActiveCustomer } from "~~/types/customer";

const { activeCustomer } = defineProps<{
  activeCustomer: ActiveCustomer;
}>();

const localePath = useLocalePath();
</script>

<template>
  <h1 class="text-2xl font-semibold">My Account</h1>
  <ULink :to="localePath('/account')" class="mt-2" aria-label="Account">
    {{ activeCustomer?.emailAddress }}
  </ULink>
</template>

<style lang="css" scoped></style>
