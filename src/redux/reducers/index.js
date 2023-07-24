import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import cartReducer from './cart';
import sessionReducer from './sessionSlice';
import  forgotPasswordReducer from './forgetPass';
import paginationReducer from './paginationSlice';

const rootReducer = combineReducers({
  counter: counterReducer, 
  cart: cartReducer,
  session: sessionReducer,
  forgotPassword: forgotPasswordReducer,
  pagination: paginationReducer,
 
});

export default rootReducer;
