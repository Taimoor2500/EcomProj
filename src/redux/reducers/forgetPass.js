import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  verifiedEmail: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setVerifiedEmail: (state, action) => {
      state.verifiedEmail = action.payload;
    },
  },
});

export const { setVerifiedEmail } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
