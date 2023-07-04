import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ValidationComp from './ValidationComp';

const ForgotPasswordComponent = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangeButton, setShowChangeButton] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setShowPasswordFields(true);
    setShowChangeButton(true);
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = () => {
    // Perform the password change logic here
    // You can access the newPassword and confirmPassword values from state
    console.log('Password changed');
    setPasswordChanged(true);
  };

  const handleGoBackToLogin = () => {
    setPasswordChanged(false);
    setShowPasswordFields(false);
    setShowChangeButton(false);
  };

  return (
    <div className='container'>
      <h3 className='text-center text-white pt-5'>Forgot Password</h3>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='container-fluid'>
                {!passwordChanged ? (
                  <>
                    <h5 className='card-title text-center'>Reset Password</h5>
                    <form onSubmit={handleSubmit}>
                      <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>
                          Email
                        </label>
                        <input type='email' className='form-control' id='email' />
                      </div>
                      <button type='submit' className='btn btn-primary'>
                        Reset Password
                      </button>
                    </form>
                    {showPasswordFields && (
                      <div>
                        <div className='mb-3'>
                          <label htmlFor='newPassword' className='form-label'>
                            New Password
                          </label>
                          <input
                            type='password'
                            className='form-control'
                            id='newPassword'
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='confirmPassword' className='form-label'>
                            Confirm Password
                          </label>
                          <input
                            type='password'
                            className='form-control'
                            id='confirmPassword'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>
                        {showChangeButton && (
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={handleChangePassword}
                          >
                            Change Password
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <ValidationComp />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
