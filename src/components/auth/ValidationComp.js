import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import ForgotPasswordComponent from './password';

const Val = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fp, setFp] = useState(false);
  const [isSign, setIsSign] = useState(false);

  const toggleForm = () => {
    setIsLogin(false);
    setFp(false);
  };

  const toggleForm2 = () => {
    setIsLogin(false);
    setIsSign(false);
    setFp(true);
  };

  return (
    <div className='container'>
      {isLogin ? (
        <LoginComponent toggleForm={toggleForm} toggleForm2={toggleForm2} />
      ) : fp ? (
        <ForgotPasswordComponent />
      ) : (
        <SignupComponent toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Val;
