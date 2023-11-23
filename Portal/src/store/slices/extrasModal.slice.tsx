import { createSlice } from '@reduxjs/toolkit';

export const extrasModalSlice = createSlice({
  name: 'extrasModal',
  initialState: false,
  reducers: {
    setToggleModal: (state) => {
      return !state;
    },
  },
});

export const { setToggleModal } = extrasModalSlice.actions;

export default extrasModalSlice.reducer;
