import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import ForgotPasswordComponent from './password';

const Val = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [fp, setFp] = useState(false);

  const toggleLoginForm = () => {
    setIsLogin(true);
    setIsSignup(false);
    setFp(false);
  };

  const toggleSignupForm = () => {
    setIsLogin(false);
    setIsSignup(true);
    setFp(false);
  };

  const toggleForgotPasswordForm = () => {
    setIsLogin(false);
    setIsSignup(false);
    setFp(true);
  };

  return (
    <div className='container'>
      {isLogin && (
        <LoginComponent toggleForm={toggleSignupForm} toggleForm2={toggleForgotPasswordForm} />
      )}
      {isSignup && (
        <SignupComponent toggleForm={toggleLoginForm} />
      )}
      {fp && <ForgotPasswordComponent />}
    </div>
  );
};

export default Val;
