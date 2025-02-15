import axios from 'axios';
import { etsyConfig } from '../config/etsyConfig';

export class EtsyService {
    private baseUrl: string;
    private apiKey: string;
    private accessToken: string | null;

    constructor() {
        this.baseUrl = etsyConfig.baseUrl;
        this.apiKey = etsyConfig.apiKey;
        this.accessToken = null;
    }

    private getHeaders() {
        const headers: any = {
            'x-api-key': this.apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        return headers;
    }

    async getShopListings(shopId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/shops/${shopId}/listings/active`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy API Hatası:', error);
            throw error;
        }
    }

    async getListingById(listingId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/listings/${listingId}`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy API Hatası:', error);
            throw error;
        }
    }

    async getShopReceipts(shopId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/shops/${shopId}/receipts`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy API Hatası:', error);
            throw error;
        }
    }

    // Etsy'den ürünleri getir
    public async getListings() {
        try {
            if (!this.accessToken) {
                throw new Error('OAuth token gerekli');
            }

            const response = await axios.get(`${this.baseUrl}/application/listings/active`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Etsy listings hatası:', error);
            throw error;
        }
    }

    // Etsy'den siparişleri getir
    public async getOrders() {
        try {
            const response = await axios.get(`${this.baseUrl}/application/shops/me/receipts`, {
                headers: {
                    'x-api-key': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error('Etsy orders hatası:', error);
            throw error;
        }
    }

    // OAuth URL oluştur
    public getAuthUrl() {
        const scopes = etsyConfig.scopes.join(' ');
        const state = this.generateState();
        
        return `${this.baseUrl}/public/oauth/authorize?` +
            `response_type=code&` +
            `client_id=${this.apiKey}&` +
            `redirect_uri=${encodeURIComponent(etsyConfig.callbackUrl)}&` +
            `scope=${encodeURIComponent(scopes)}&` +
            `state=${state}`;
    }

    // OAuth callback'i işle
    public async handleCallback(code: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/public/oauth/token`, {
                grant_type: 'authorization_code',
                client_id: this.apiKey,
                redirect_uri: etsyConfig.callbackUrl,
                code: code
            });

            this.accessToken = response.data.access_token;
            return response.data;
        } catch (error) {
            console.error('OAuth token hatası:', error);
            throw error;
        }
    }

    private generateState() {
        return Math.random().toString(36).substring(7);
    }

    // Mağaza bilgilerini getir
    public async getShopInfo() {
        try {
            const response = await axios.get(`${this.baseUrl}/application/shops/me`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Etsy shop bilgisi hatası:', error);
            throw error;
        }
    }

    // Ürün detaylarını getir
    public async getListingDetails(listingId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/listings/${listingId}`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy ürün detay hatası:', error);
            throw error;
        }
    }

    // Ürün görsellerini getir
    public async getListingImages(listingId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/listings/${listingId}/images`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy ürün görselleri hatası:', error);
            throw error;
        }
    }

    // Ürün stok bilgisini getir
    public async getListingInventory(listingId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/listings/${listingId}/inventory`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy stok bilgisi hatası:', error);
            throw error;
        }
    }

    // Sipariş detaylarını getir
    public async getOrderDetails(orderId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/shops/me/receipts/${orderId}`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy sipariş detay hatası:', error);
            throw error;
        }
    }

    // Sipariş öğelerini getir
    public async getOrderItems(orderId: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/application/shops/me/receipts/${orderId}/transactions`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Etsy sipariş öğeleri hatası:', error);
            throw error;
        }
    }
} 