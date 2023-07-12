import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ toggleForm, toggleForm2 }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
   

    
    const loginData = {
      username,
      password
    };

    try {
  
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        
        console.log('User exists');
        navigate("/");
      } else {
        
        console.log('User does not exist');
      }
    } catch (error) {
      
      console.error('Error:', error);
    }


  };

  const handleRegisterClick = () => {
    toggleForm2();
  };

  return (
    <div>
      <h3 className='text-center text-white pt-5'>Login form</h3>
      <div className='container'>
        <div id='login-row' className='row justify-content-center align-items-center'>
          <div id='login-column' className='col-md-6'>
            <div id='login-box' className='col-md-12'>
              <form id='login-form' className='form' onSubmit={handleSubmit}>
                <h3 className='text-center text-info'>Login</h3>
                <div className='form-group'>
                  <label htmlFor='username' className='text-info'>
                    Username:
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    className='form-control'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password' className='text-info'>
                    Password:
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='form-control'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' id='remember-me' name='remember-me' />
                    <label className='form-check-label' htmlFor='remember-me'>
                      Remember me
                    </label>
                  </div>
                </div>
                <div className='form-group'>
                  <input type='submit' name='submit' className='btn btn-info btn-md' value='Submit' />
                </div>
                <div id='register-link' className='text-right'>
                  <a href='#' className='text-info' onClick={handleRegisterClick}>
                    Forgot password
                  </a>
                  <div className='text-right'>
                    <a href='#' className='text-info' onClick={toggleForm}>
                      Register Here
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginComponent.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  toggleForm2: PropTypes.func.isRequired,
};

export default LoginComponent;
