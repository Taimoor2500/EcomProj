import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.findIndex((product) => product._id === productId);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.find((product) => product._id === productId);
      if (product) {
        if (product.quantity < product.stock) {
          product.quantity += 1;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.find((product) => product._id === productId);
      if (product) {
        if (product.quantity === product.stock) {
          // User has not manually increased the quantity, decrease by 1 from stock
          product.quantity -= 1;
        } else if (product.quantity > 1) {
          // User has manually decreased the quantity, decrease by user-specified quantity
          product.quantity -= 1;
        }
      }
    },
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
