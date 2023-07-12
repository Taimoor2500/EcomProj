import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import cartReducer from './cart';

const rootReducer = combineReducers({
  counter: counterReducer, 
  cart: cartReducer,
 
});

export default rootReducer;
