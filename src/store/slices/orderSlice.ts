import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderService } from '../../services/OrderService';
import { OrderState } from '../types';

const initialState: OrderState = {
    items: [],
    loading: false,
    error: null
};

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const orderService = new OrderService();
        return await orderService.getOrders();
    }
);

export const syncOrders = createAsyncThunk(
    'orders/syncOrders',
    async () => {
        const orderService = new OrderService();
        return await orderService.syncFromEtsy();
    }
);

export const createInvoice = createAsyncThunk(
    'orders/createInvoice',
    async (orderId: number) => {
        const orderService = new OrderService();
        return await orderService.createInvoice(orderId);
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Bir hata oluştu';
            })
            .addCase(syncOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(syncOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(syncOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Senkronizasyon hatası';
            });
    }
});

export default orderSlice.reducer; 