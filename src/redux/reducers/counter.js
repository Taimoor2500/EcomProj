import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => {
     
      return state > 0 ? state - 1 : state;
    },
    resetCounter: () => 0,
  },
});

export const { increment, decrement, resetCounter } = counterSlice.actions;

export default counterSlice.reducer;
