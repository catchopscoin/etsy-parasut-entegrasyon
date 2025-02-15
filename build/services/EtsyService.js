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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtsyService = void 0;
const axios_1 = __importDefault(require("axios"));
const etsyConfig_1 = require("../config/etsyConfig");
class EtsyService {
    constructor() {
        this.baseUrl = etsyConfig_1.etsyConfig.baseUrl;
        this.apiKey = etsyConfig_1.etsyConfig.apiKey;
        this.accessToken = null;
    }
    getHeaders() {
        const headers = {
            'x-api-key': this.apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        return headers;
    }
    getShopListings(shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/shops/${shopId}/listings/active`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy API Hatası:', error);
                throw error;
            }
        });
    }
    getListingById(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/listings/${listingId}`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy API Hatası:', error);
                throw error;
            }
        });
    }
    getShopReceipts(shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/shops/${shopId}/receipts`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy API Hatası:', error);
                throw error;
            }
        });
    }
    // Etsy'den ürünleri getir
    getListings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.accessToken) {
                    throw new Error('OAuth token gerekli');
                }
                const response = yield axios_1.default.get(`${this.baseUrl}/application/listings/active`, {
                    headers: this.getHeaders()
                });
                return response.data;
            }
            catch (error) {
                console.error('Etsy listings hatası:', error);
                throw error;
            }
        });
    }
    // Etsy'den siparişleri getir
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/shops/me/receipts`, {
                    headers: {
                        'x-api-key': this.apiKey
                    }
                });
                return response.data;
            }
            catch (error) {
                console.error('Etsy orders hatası:', error);
                throw error;
            }
        });
    }
    // OAuth URL oluştur
    getAuthUrl() {
        const scopes = etsyConfig_1.etsyConfig.scopes.join(' ');
        const state = this.generateState();
        return `${this.baseUrl}/public/oauth/authorize?` +
            `response_type=code&` +
            `client_id=${this.apiKey}&` +
            `redirect_uri=${encodeURIComponent(etsyConfig_1.etsyConfig.callbackUrl)}&` +
            `scope=${encodeURIComponent(scopes)}&` +
            `state=${state}`;
    }
    // OAuth callback'i işle
    handleCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.baseUrl}/public/oauth/token`, {
                    grant_type: 'authorization_code',
                    client_id: this.apiKey,
                    redirect_uri: etsyConfig_1.etsyConfig.callbackUrl,
                    code: code
                });
                this.accessToken = response.data.access_token;
                return response.data;
            }
            catch (error) {
                console.error('OAuth token hatası:', error);
                throw error;
            }
        });
    }
    generateState() {
        return Math.random().toString(36).substring(7);
    }
    // Mağaza bilgilerini getir
    getShopInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/shops/me`, {
                    headers: this.getHeaders()
                });
                return response.data;
            }
            catch (error) {
                console.error('Etsy shop bilgisi hatası:', error);
                throw error;
            }
        });
    }
    // Ürün detaylarını getir
    getListingDetails(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/listings/${listingId}`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy ürün detay hatası:', error);
                throw error;
            }
        });
    }
    // Ürün görsellerini getir
    getListingImages(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/listings/${listingId}/images`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy ürün görselleri hatası:', error);
                throw error;
            }
        });
    }
    // Ürün stok bilgisini getir
    getListingInventory(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/listings/${listingId}/inventory`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy stok bilgisi hatası:', error);
                throw error;
            }
        });
    }
    // Sipariş detaylarını getir
    getOrderDetails(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/shops/me/receipts/${orderId}`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy sipariş detay hatası:', error);
                throw error;
            }
        });
    }
    // Sipariş öğelerini getir
    getOrderItems(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/application/shops/me/receipts/${orderId}/transactions`, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Etsy sipariş öğeleri hatası:', error);
                throw error;
            }
        });
    }
}
exports.EtsyService = EtsyService;
