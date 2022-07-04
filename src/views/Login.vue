<template>
  <div class="max-w-lg m-auto">
    <form @submit.prevent="handleLogin()">
      <h1 class="text-3xl mb-5">Login</h1>
      <div class="mt-3">
        <label>Email <input v-model="form.email" type="email" /></label>
      </div>
      <div class="mt-3">
        <label>Password <input v-model="form.password" type="password" /></label>
      </div>
      <Button label="Login" class="mt-3" />
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </form>
    <div class="mt-5">
      <a @click.prevent="handleLogin('github')">Github</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import Button from '@/components/Button.vue';

const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

const form = ref({
  email: '',
  password: '',
});
const isLoading = ref(false);

const handleLogin = async (provider) => {
  try {
    isLoading.value = true;
    provider ? await loginWithSocialProvider(provider) : await login(form.value);

    router.push({ name: 'Me' });
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
