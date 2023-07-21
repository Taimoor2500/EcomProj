import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/reducers/sessionSlice';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, name, email } = data;

        if (rememberMe) {
          localStorage.setItem('token', JSON.stringify({ token, name, email }));
        }

        dispatch(setToken({ token, name, email }));
        

        console.log('Login successful');
        navigate('/');
      } else {
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handlePass = (e) => {
    e.preventDefault();
    navigate('/pass');
  };

  return (
    <div>
      <h3 className="text-center text-white pt-5">Login form</h3>
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={handleSubmit}>
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="email" className="text-info">
                    Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-info">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    {/* "Remember Me" checkbox */}
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                </div>
                <div id="register-link" className="text-right">
                  <a href="#" className="text-info" onClick={handlePass}>
                    Forgot password
                  </a>
                  <div className="text-right">
                    <a href="#" className="text-info" onClick={handleRegisterClick}>
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

export default LoginComponent;
