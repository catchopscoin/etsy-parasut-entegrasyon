"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = exports.API_BASE_URL = void 0;
exports.API_BASE_URL = 'http://localhost:3001/api';
exports.endpoints = {
    // Etsy endpoints
    etsy: {
        auth: '/etsy/auth',
        callback: '/etsy/callback',
        shop: '/etsy/shop',
        listings: '/etsy/listings',
        orders: '/etsy/orders'
    },
    // Parasut endpoints
    parasut: {
        invoices: '/parasut/invoices',
        contacts: '/parasut/contacts'
    },
    // Local endpoints
    products: '/products',
    orders: '/orders',
    settings: '/settings'
};
