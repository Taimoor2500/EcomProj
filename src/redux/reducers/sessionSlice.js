import { createSlice } from '@reduxjs/toolkit';

const sessionReducer = createSlice({
  name: 'session',
  initialState: {
    token: '',
    name: '',
    email: '',
    role: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    clearSession: (state) => {
      state.token = '';
      state.name = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { setToken,clearSession } = sessionReducer.actions;

export default sessionReducer.reducer;
