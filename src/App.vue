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
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
// import { store } from './store';
// import { supabase } from './supabase';
// import Auth from './components/Auth.vue';
// import Profile from './components/Profile.vue';

// store.user = supabase.auth.user();
// supabase.auth.onAuthStateChange((_, session) => {
//   store.user = session.user;
// });
</script>
