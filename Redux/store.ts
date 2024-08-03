import { configureStore } from '@reduxjs/toolkit';
import priceDataReducer from './priceDataSlice';

export const store = configureStore({
  reducer: {
    priceData: priceDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
