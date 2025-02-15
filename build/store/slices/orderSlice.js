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
exports.createInvoice = exports.syncOrders = exports.fetchOrders = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const OrderService_1 = require("../../services/OrderService");
const initialState = {
    items: [],
    loading: false,
    error: null
};
exports.fetchOrders = (0, toolkit_1.createAsyncThunk)('orders/fetchOrders', () => __awaiter(void 0, void 0, void 0, function* () {
    const orderService = new OrderService_1.OrderService();
    return yield orderService.getOrders();
}));
exports.syncOrders = (0, toolkit_1.createAsyncThunk)('orders/syncOrders', () => __awaiter(void 0, void 0, void 0, function* () {
    const orderService = new OrderService_1.OrderService();
    return yield orderService.syncFromEtsy();
}));
exports.createInvoice = (0, toolkit_1.createAsyncThunk)('orders/createInvoice', (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderService = new OrderService_1.OrderService();
    return yield orderService.createInvoice(orderId);
}));
const orderSlice = (0, toolkit_1.createSlice)({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
            .addCase(exports.fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Bir hata oluştu';
        })
            .addCase(exports.syncOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.syncOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
            .addCase(exports.syncOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Senkronizasyon hatası';
        });
    }
});
exports.default = orderSlice.reducer;
