<template>
  <main v-if="isLoggedIn()">
    <h1 class="text-3xl font-bold underline text-red-500 dark:text-blue-800">Home view</h1>
    <p>USER: {{ userStore.user.user_metadata.name }}</p>
    <button @click="handleSignout">Logout</button>
    <!-- <HeadlessModal modalTitle="modal title papai">
      <template #modal-content>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
            Thank you baby
          </p>
        </div>
      </template>
    </HeadlessModal> -->
  </main>
</template>

<script setup>
import useAuthUser from '../composables/useAuthUser';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const { logout, isLoggedIn } = useAuthUser();

const handleSignout = async () => {
  await logout();
};

// import HeadlessModal from '../components/HeadlessModal.vue';
</script>
