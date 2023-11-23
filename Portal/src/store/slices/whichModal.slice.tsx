import { createSlice } from '@reduxjs/toolkit';

export const whichModalSlice = createSlice({
  name: 'whichModal',
  initialState: 0,
  reducers: {
    setCartModal: () => 1,
    setMenuModal: () => 0,
  },
});

export const { setCartModal, setMenuModal } = whichModalSlice.actions;

export default whichModalSlice.reducer;
