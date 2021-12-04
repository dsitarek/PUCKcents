import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.REACT_APP_DATABASE_URL, process.env.REACT_APP_API_KEY);

const signInUser = async () => {
  await supabase.auth.signIn({
    provider: 'google',
  });
};

const signOutUser = async () => {
  await supabase.auth.signOut();
};

const getUser = () => supabase.auth.user();

const getSession = supabase.auth.session();

export {
  supabase, signInUser, signOutUser, getUser, getSession,
};
