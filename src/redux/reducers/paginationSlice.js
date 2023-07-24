import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: 
  {
    pageNumber: 1,
    totalPages: 0,
  },
  reducers: {
    incrementPagination: (state) => {
      state.pageNumber += 1;
    },
    decrementPagination: (state) => {
      state.pageNumber -= 1;
    },
    resetPaginationCounter: (state) => {
      state.pageNumber = 1;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  incrementPagination,
  decrementPagination,
  resetPaginationCounter,
  setTotalPages,
} = paginationSlice.actions;

export default paginationSlice.reducer;
