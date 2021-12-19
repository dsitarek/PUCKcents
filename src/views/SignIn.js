import React from 'react';
import logo from '../assets/logo3.png';

export default function SignIn() {
  return (
    <div className="text-center mt-5">
      <h1 className="sign-in-header">Welcome! You must be logged in to view your lines.</h1>
      <img className="sign-in-img" src={logo} alt="logo" />
    </div>
  );
}
