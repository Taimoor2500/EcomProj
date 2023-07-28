import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    saveOrderData: (state, action) => {
      state.push(action.payload);
    },
    clearOrderData: (state) => {
      state.splice(0); 
    },
  },
});

export const { saveOrderData, clearOrderData } = orderSlice.actions;

export default orderSlice.reducer;
