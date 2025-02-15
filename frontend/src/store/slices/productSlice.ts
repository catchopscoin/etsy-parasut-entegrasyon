import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '../types';
import { ProductService } from '../../services/ProductService';
import { showSnackbar } from '../../components/Snackbar';
import { AppDispatch } from '..';

const productService = new ProductService();

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
  'products/fetchProducts',
  async (_, { dispatch }) => {
    try {
      const data = await productService.getProducts();
      dispatch(showSnackbar({ message: 'Ürünler başarıyla yüklendi', severity: 'success' }));
      return data;
    } catch (error) {
      dispatch(showSnackbar({ 
        message: 'Ürünler yüklenirken bir hata oluştu', 
        severity: 'error' 
      }));
      throw error;
    }
  }
);

export const syncProducts = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
  'products/syncProducts',
  async (_, { dispatch }) => {
    try {
      const data = await productService.syncFromEtsy();
      dispatch(showSnackbar({ 
        message: 'Ürünler Etsy ile başarıyla senkronize edildi', 
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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      .addCase(syncProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(syncProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Senkronizasyon hatası';
      });
  }
});

export default productSlice.reducer; 