<script setup lang="ts"></script>

<template>
  <USlideover title="Menu" side="left" description="Mobile Menu">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <div>Home</div>
    </template>

    <template #footer>
      <div class="flex gap-2">Footer</div>
    </template>
  </USlideover>
</template>

<style lang="css" scoped></style>
