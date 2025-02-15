import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        orders: orderReducer,
        settings: settingsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 