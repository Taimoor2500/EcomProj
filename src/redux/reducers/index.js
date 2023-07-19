import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import cartReducer from './cart';
import sessionReducer from './sessionSlice';
import  forgotPasswordReducer from './forgetPass';

const rootReducer = combineReducers({
  counter: counterReducer, 
  cart: cartReducer,
  session: sessionReducer,
  forgotPassword: forgotPasswordReducer,
 
});

export default rootReducer;
