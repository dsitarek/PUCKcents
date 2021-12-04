import React from 'react';
import { signOutUser, getUser } from '../api/auth';

export default function Authenticated() {
  const user = getUser();
  return (
    <div className="text-center mt-5">
      <h1>Welcome, {user.user_metadata.full_name}!</h1>
      <div className="mt-2">
        <button type="button" className="btn btn-danger" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
