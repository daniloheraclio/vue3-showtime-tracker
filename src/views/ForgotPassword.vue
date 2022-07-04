<template>
  <form class="max-w-lg m-auto" @submit.prevent="handlePasswordReset()">
    <h1 class="text-3xl mb-5">Forgot Password?</h1>
    <div class="mt-3">
      <label>Email <input v-model="email" type="email" /></label>
    </div>
    <Button label="Send Reset Email" class="mt-3" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import useAuthUser from '@/composables/useAuthUser';
import Button from '@/components/Button.vue';

const { sendPasswordRestEmail } = useAuthUser();
const email = ref('');

const handlePasswordReset = async () => {
  await sendPasswordRestEmail(email.value);

  alert(`Password reset email sent to: ${email.value}`);
};
</script>
