import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductService } from '../../services/ProductService';
import { ProductState } from '../types';

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const productService = new ProductService();
        return await productService.getProducts();
    }
);

export const syncProducts = createAsyncThunk(
    'products/syncProducts',
    async () => {
        const productService = new ProductService();
        return await productService.syncFromEtsy();
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
            })
            .addCase(syncProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Senkronizasyon hatası';
            });
    }
});

export default productSlice.reducer; 