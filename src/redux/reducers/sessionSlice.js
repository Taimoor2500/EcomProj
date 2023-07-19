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
  },
});

export const { setToken } = sessionReducer.actions;

export default sessionReducer.reducer;
