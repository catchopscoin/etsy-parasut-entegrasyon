import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderState } from '../types';
import { OrderService } from '../../services/OrderService';
import { showSnackbar } from '../../components/Snackbar';
import { AppDispatch } from '..';

const orderService = new OrderService();

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
  'orders/fetchOrders',
  async (_, { dispatch }) => {
    try {
      const data = await orderService.getOrders();
      dispatch(showSnackbar({ message: 'Siparişler başarıyla yüklendi', severity: 'success' }));
      return data;
    } catch (error) {
      dispatch(showSnackbar({ 
        message: 'Siparişler yüklenirken bir hata oluştu', 
        severity: 'error' 
      }));
      throw error;
    }
  }
);

export const syncOrders = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
  'orders/syncOrders',
  async (_, { dispatch }) => {
    try {
      const data = await orderService.syncFromEtsy();
      dispatch(showSnackbar({ 
        message: 'Siparişler Etsy ile başarıyla senkronize edildi', 
        severity: 'success' 
      }));
      return data;
    } catch (error) {
      dispatch(showSnackbar({ 
        message: 'Senkronizasyon sırasında bir hata oluştu', 
        severity: 'error' 
      }));
      throw error;
    }
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
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export default orderSlice.reducer; 