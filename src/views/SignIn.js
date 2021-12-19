import React from 'react';
import logo from '../assets/logo3.png';

export default function SignIn() {
  return (
    <div className="text-center mt-5">
      <h1 className="sign-in-header">Welcome! Please sign in to view or create lines.</h1>
      <img className="sign-in-img" src={logo} alt="logo" />
    </div>
  );
}
