import { createSlice } from '@reduxjs/toolkit';

export const editProductSlice = createSlice({
  name: 'productToEdit',
  initialState: {},
  reducers: {
    setSelectProduct: (_state, action) => {
      return action.payload;
    },
    setDeselectProduct: () => {
      return {};
    },
  },
});

export const { setSelectProduct, setDeselectProduct } = editProductSlice.actions;

export default editProductSlice.reducer;
