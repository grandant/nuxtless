<script setup lang="ts"></script>

<template>
  <header class="border-b bg-gray-100/80 backdrop-blur dark:bg-gray-800/80">
    <div class="container flex gap-6">
      <LogoElement />
      <HeaderDesktopMenu class="hidden md:flex" />
      <HeaderMobileMenuTrigger />
      <CartTrigger />
    </div>
  </header>
</template>
