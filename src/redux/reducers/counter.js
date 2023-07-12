import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    resetCounter: () => 0,
  },
});

export const { increment, decrement, resetCounter } = counterSlice.actions;

export default counterSlice.reducer;
