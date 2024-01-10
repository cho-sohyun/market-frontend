import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import wishReducer from './wishSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wish: wishReducer,
  },
});
