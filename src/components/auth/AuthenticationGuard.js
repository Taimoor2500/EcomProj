/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/reducers/sessionSlice';
import { useNavigate } from 'react-router-dom';

const AuthenticationGuard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const { token, name, email, role } = JSON.parse(storedToken);
      dispatch(setToken({ token, name, email, role }));

     
      if (role === 'admin') {
        navigate('/admin');
      }
    } else {
      
    }
  }, [dispatch, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthenticationGuard;
