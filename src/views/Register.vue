<template>
  <form class="max-w-lg m-auto" @submit.prevent="handleSubmit">
    <h1 class="text-3xl mb-5">Register</h1>
    <div class="mt-3">
      <label>Name <input v-model="form.name" type="text" /></label>
    </div>
    <div class="mt-3">
      <label>Email <input v-model="form.email" type="email" /></label>
    </div>
    <div class="mt-3">
      <label>Password <input v-model="form.password" type="password" /></label>
    </div>
    <Button label="Register" :isDisabled="isLoading" class="mt-3" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import Button from '@/components/Button.vue';

const { register } = useAuthUser();
const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
});

const isLoading = ref(false);

const handleSubmit = async () => {
  try {
    isLoading.value = true;

    // use the register method from the AuthUser composable
    await register(form.value);

    // and redirect to a EmailConfirmation page the will instruct
    // the user to confirm they're email address
    router.push({
      name: 'EmailConfirmation',
      query: { email: form.value.email },
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
