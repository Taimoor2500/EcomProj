import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  var text = "";
  const handleSendToken = () => {
    axios
      .post('http://localhost:5000/api/login/check', { email })
      .then(response => {
        setShowEmailInput(false);
      
      })
      .catch(error => {
        text = "Error sending reset token. Please try again.";
        setErrorMessage(text);
      });
  };

  const handleResetPassword = () => {
    axios
      .post('http://localhost:5000/api/login/validate-token', { resetToken })
      .then(response => {
        if (response.data.isValid) {
          axios
            .put('http://localhost:5000/api/login/password', {
              email: email,
              resetToken: resetToken,
              newPassword: newPassword
            })
            .then(response => {
              navigate('/login');
            })
            .catch(error => {
              setErrorMessage('Error resetting password. Please try again.');
            });
        } else {
          setErrorMessage('Invalid reset token. Please try again.');
        }
      })
      .catch(error => {
        setErrorMessage('Error validating token. Please try again.');
      });
  };

  const handleTokenChange = e => {
    setResetToken(e.target.value);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Reset Password</h2>
      {showEmailInput && (
        <>
          <p>Please enter your email address to receive a reset token:</p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          <button onClick={handleSendToken} className="btn btn-primary">
            Send Token
          </button>
        </>
      )}
      {!showEmailInput && (
        <>
          <p>Please enter the reset token:</p>
          <input
            type="password"
            placeholder="Reset Token"
            value={resetToken}
            onChange={handleTokenChange}
            className="form-control mb-2"
          />
          {resetToken && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="form-control mb-2"
              />
              <button onClick={handleResetPassword} className="btn btn-primary">
                Reset Password
              </button>
            </>
          )}
        </>
      )}
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
    </div>
  );
};

export default ResetPasswordForm;
