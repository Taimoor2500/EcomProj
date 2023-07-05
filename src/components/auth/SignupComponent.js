import React from 'react';
import PropTypes from 'prop-types';

const SignupComponent = ({ toggleForm }) => {
  const handleSubmit = e => {
    e.preventDefault();
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
                    <input type='text' className='form-control' id='name' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input type='email' className='form-control' id='email' />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input type='password' className='form-control' id='password' />
                  </div>
                  <button type='submit' className='btn btn-primary'>
                    Sign Up
                  </button>
                  <p className='text-center mt-3'>
                    Already have an account?{' '}
                    <button className='btn btn-link p-0' onClick={toggleForm}>
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

SignupComponent.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default SignupComponent;
