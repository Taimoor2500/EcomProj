import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = { ...action.payload, timestamp: Date.now() };
      const existingProduct = state.find((product) => product._id === productToAdd._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...productToAdd, quantity: 1 });
      }

     
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
          product.quantity -= 1;
        } else if (product.quantity > 1) {
          product.quantity -= 1;
        }
      }
    },
    setCart: (state, action) => {
      return action.payload;
    },
    releaseExpiredProducts: (state) => {
      state.forEach((product) => {
        if (product.timestamp !== 0 && Date.now() - product.timestamp >= 5 * 60 * 1000) {
          product.timestamp = 0; // Release the reservation by setting the timestamp to 0
        }
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
  releaseExpiredProducts,
} = cartSlice.actions;

export const getCartLength = (state) => {
  return state.cart.length;
};
export default cartSlice.reducer;
