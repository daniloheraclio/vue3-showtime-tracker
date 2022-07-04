<template>
  <div v-if="isLogedIn">
    <!--user_metadata is the key supabase nests all arbitrary meta data under-->
    <div>Hello {{ userStore?.user.email }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import useAuthUser from '@/composables/useAuthUser';
import { useUserStore } from '@/stores/useUserStore';
// const { user } = useAuthUser();
const userStore = useUserStore();

const isLogedIn = computed(() => !!Object.keys(userStore.user));
</script>
