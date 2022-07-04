<template>
  <header>
    <div class="container">
      <!-- <Profile v-if="store.user" /> -->
      <!-- <Auth v-else /> -->
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <Switch @toggle="handleToggleDarkLightMode" />
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { useColorMode } from '@vueuse/core';
import { RouterLink, RouterView } from 'vue-router';
import Switch from '@/components/Switch.vue';

const mode = useColorMode();

const handleToggleDarkLightMode = (isDarkMode) => {
  mode.value = isDarkMode ? 'dark' : 'light';
};
</script>
