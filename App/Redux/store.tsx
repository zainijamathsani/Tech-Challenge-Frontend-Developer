import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoriteReducer from './favoriteSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
