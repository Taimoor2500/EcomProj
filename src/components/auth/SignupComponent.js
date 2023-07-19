import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      name,
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:5000/api/signup', signupData);
      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <h3 className='text-center text-white pt-5'>Signup form</h3>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title text-center'>Sign Up</h5>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='btn btn-primary'>
                    Sign Up
                  </button>
                  <p className='text-center mt-3'>
                    Already have an account?{' '}
                    <button className='btn btn-link p-0' onClick={handleLoginClick}>
                      Login here
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default SignupComponent;
