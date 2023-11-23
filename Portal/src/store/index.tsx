import { configureStore } from '@reduxjs/toolkit';
import productsInCartySlice from './slices/productsInCart.slice';
import extrasModalSlice from './slices/extrasModal.slice';
import editProductSlice from './slices/productToEdit.slice';
import whichModalSlice from './slices/whichModal.slice';

export const store = configureStore({
  reducer: {
    productsInCart: productsInCartySlice,
    extrasModal: extrasModalSlice,
    selectedProduct: editProductSlice,
    whichModal: whichModalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
