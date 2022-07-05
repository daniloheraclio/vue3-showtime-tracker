// import { ref } from 'vue';
import useSupabase from '@/composables/useSupabase';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

// const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();
  const userStore = useUserStore();
  const router = useRouter();
  /**
   * Login with email and password
   */
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    console.log(user);
    userStore.user = user;

    if (error) throw error;
    return user;
  };

  /**
   * Login with refresh token
   * Useful for logging in after email confirmations
   */
  const loginWithRefreshToken = async (token) => {
    const { user, error } = await supabase.auth.signIn({ refreshToken: token });
    if (error) throw error;
    return user;
  };

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (provider) => {
    console.log({ provider });
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  /**
   * Logout
   */
  const logout = async () => {
    console.log('loging out');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push({ name: 'Login' });
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!userStore.user;
  };

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        //arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side
        // but since we're all on the client it will work fine
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
      }
    );
    if (error) throw error;
    return user;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  };

  /**
   * Will be useful for informing the application what to do
   * when Supabase redirects a user back to app
   * after confirming email address
   */
  const maybeHandleEmailConfirmation = async (route) => {
    // to be developed
    console.log(route);
  };

  return {
    login,
    loginWithRefreshToken,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    maybeHandleEmailConfirmation,
  };
}
