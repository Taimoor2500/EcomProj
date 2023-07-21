/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/reducers/sessionSlice';

const AuthenticationGuard = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
     
      const { token, name, email } = JSON.parse(storedToken);
      dispatch(setToken({ token, name, email }));
    }
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthenticationGuard;
