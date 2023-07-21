import { createSlice } from '@reduxjs/toolkit';

const sessionReducer = createSlice({
  name: 'session',
  initialState: {
    token: '',
    name: '',
    email: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearSession: (state) => {
      state.token = '';
      state.name = '';
      state.email = '';
    },
  },
});

export const { setToken,clearSession } = sessionReducer.actions;

export default sessionReducer.reducer;
