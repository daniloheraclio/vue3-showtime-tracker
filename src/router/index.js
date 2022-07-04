import { createRouter, createWebHistory } from 'vue-router';
import useAuthUser from '@/composables/useAuthUser';
import useSupabase from '@/composables/UseSupabase';
import { useUserStore } from '@/stores/useUserStore';
import Home from '../views/Home.vue';

const { supabase } = useSupabase();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/Register.vue'),
    },
    {
      name: 'EmailConfirmation',
      path: '/email-confirmation',
      component: () => import('@/views/EmailConfirmation.vue'),
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      name: 'Logout',
      path: '/logout',
      beforeEnter: async () => {
        const { logout } = useAuthUser();
        await logout();
        return { name: 'Home' };
      },
    },
    {
      name: 'ForgotPassword',
      path: '/forgotPassword',
      component: () => import('@/views/ForgotPassword.vue'),
    },
    {
      name: 'Me',
      path: '/me',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/views/Me.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/About.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const session = supabase.auth.session();
  // here we check it the user is logged in
  // if they aren't and the route requires auth we redirect to the login page
  const userStore = useUserStore();
  if (session) {
    userStore.user = session.user;
  }

  if (!session && to.meta.requiresAuth && !Object.keys(to.query).includes('fromEmail')) {
    return { name: 'Login' };
  }
});

export default router;
