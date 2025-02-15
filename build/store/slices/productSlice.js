"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncProducts = exports.fetchProducts = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const ProductService_1 = require("../../services/ProductService");
const initialState = {
    items: [],
    loading: false,
    error: null
};
exports.fetchProducts = (0, toolkit_1.createAsyncThunk)('products/fetchProducts', () => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new ProductService_1.ProductService();
    return yield productService.getProducts();
}));
exports.syncProducts = (0, toolkit_1.createAsyncThunk)('products/syncProducts', () => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new ProductService_1.ProductService();
    return yield productService.syncFromEtsy();
}));
const productSlice = (0, toolkit_1.createSlice)({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
            .addCase(exports.fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Bir hata oluştu';
        })
            .addCase(exports.syncProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.syncProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
            .addCase(exports.syncProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Senkronizasyon hatası';
        });
    }
});
exports.default = productSlice.reducer;
