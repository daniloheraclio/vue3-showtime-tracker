import { createClient } from '@supabase/supabase-js';
import { useUserStore } from '@/stores/useUserStore';
// import useAuthUser from '@/composables/UseAuthUser';

const supabaseKey = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseKey, supabaseAnonKey);

// ⬇ setup auth state listener ⬇
supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user data
  // const { user } = useAuthUser();
  const userStore = useUserStore();

  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
  userStore.user = session?.user || null;
});

// expose supabase client
export default function useSupabase() {
  return { supabase };
}
