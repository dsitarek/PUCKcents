import React, { useState, useEffect } from 'react';
import { supabase } from '../api/auth';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((e, _session) => {
      setSession(_session);
    });
  }, []);

  return (
    <>
      {session ? <Routes /> : <SignIn />}
    </>
  );
}

export default Initialize;
