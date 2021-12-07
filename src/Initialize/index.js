import React, { useState, useEffect } from 'react';
import { supabase } from '../api/auth';
import Routes from '../routes';
import SignIn from '../views/SignIn';
import { AppNavbar } from '../components/index';

function Initialize() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((e, _session) => {
      setSession(_session);
    });
  }, []);

  return (
    <>
      <AppNavbar />
      {session ? <Routes /> : <SignIn />}
    </>
  );
}

export default Initialize;
