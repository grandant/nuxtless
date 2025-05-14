<script setup lang="ts"></script>

<template>
  <header class="z-1 border-b bg-gray-100/80 backdrop-blur dark:bg-gray-800/80">
    <div class="container flex gap-6">
      <LogoElement />
      <HeaderDesktopMenu class="hidden md:flex" />
      <HeaderMobileMenu class="flex md:hidden" />
      <CartTrigger />
    </div>
    <CartPanel />
  </header>
</template>
