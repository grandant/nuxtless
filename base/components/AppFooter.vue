<script setup lang="ts"></script>

<template>
  <footer
    class="border-t bg-gray-100/80 py-6 text-sm backdrop-blur dark:bg-gray-800/80"
  >
    <div class="container mx-auto flex flex-col items-center gap-2 text-center">
      <p>
        <LogoElement
          logo-light="/logo-full.svg"
          logo-dark="/logo-full.svg"
          :width="75"
        />
      </p>
    </div>
    <hr class="m-4" />
    <div class="flex justify-center">
      <p class="opacity-80">Built with ❤️ on Unstack</p>
    </div>
  </footer>
</template>

<style lang="css" scoped></style>
