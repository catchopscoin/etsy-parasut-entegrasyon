"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const productSlice_1 = __importDefault(require("./slices/productSlice"));
const orderSlice_1 = __importDefault(require("./slices/orderSlice"));
const settingsSlice_1 = __importDefault(require("./slices/settingsSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        products: productSlice_1.default,
        orders: orderSlice_1.default,
        settings: settingsSlice_1.default
    }
});
