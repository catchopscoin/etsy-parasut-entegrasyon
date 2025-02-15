import { Request, Response } from 'express';
import { EtsyService } from '../services/EtsyService';

export class EtsyController {
    private etsyService: EtsyService;

    constructor() {
        this.etsyService = new EtsyService();
    }

    // OAuth başlat
    public startAuth = async (req: Request, res: Response) => {
        try {
            const authUrl = this.etsyService.getAuthUrl();
            res.redirect(authUrl);
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Etsy yetkilendirme hatası'
            });
        }
    }

    // Ürünleri getir
    public getListings = async (req: Request, res: Response) => {
        try {
            const listings = await this.etsyService.getListings();
            res.json({
                success: true,
                data: listings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Etsy ürünleri getirilirken hata oluştu'
            });
        }
    }

    // Ürün görsellerini getir
    public getListingImages = async (req: Request, res: Response) => {
        try {
            const { listingId } = req.params;
            const images = await this.etsyService.getListingImages(listingId);
            res.json({
                success: true,
                data: images
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Ürün görselleri getirilirken hata oluştu'
            });
        }
    }

    // Ürün stok bilgisini getir
    public getListingInventory = async (req: Request, res: Response) => {
        try {
            const { listingId } = req.params;
            const inventory = await this.etsyService.getListingInventory(listingId);
            res.json({
                success: true,
                data: inventory
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Stok bilgisi getirilirken hata oluştu'
            });
        }
    }

    // Siparişleri getir
    public getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await this.etsyService.getOrders();
            res.json({
                success: true,
                data: orders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Etsy siparişleri getirilirken hata oluştu'
            });
        }
    }

    // Sipariş öğelerini getir
    public getOrderItems = async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const items = await this.etsyService.getOrderItems(orderId);
            res.json({
                success: true,
                data: items
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Sipariş öğeleri getirilirken hata oluştu'
            });
        }
    }

    // OAuth callback
    public handleCallback = async (req: Request, res: Response) => {
        try {
            const { code } = req.query;
            if (!code) {
                throw new Error('Authorization code eksik');
            }

            const tokenData = await this.etsyService.handleCallback(code.toString());
            res.json({
                success: true,
                message: 'OAuth başarılı',
                data: tokenData
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'OAuth işlemi başarısız'
            });
        }
    }

    // Mağaza bilgileri
    public getShopInfo = async (req: Request, res: Response) => {
        try {
            const shopInfo = await this.etsyService.getShopInfo();
            res.json({
                success: true,
                data: shopInfo
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Mağaza bilgileri getirilirken hata oluştu'
            });
        }
    }

    // Ürün detayları
    public getListingDetails = async (req: Request, res: Response) => {
        try {
            const { listingId } = req.params;
            const details = await this.etsyService.getListingDetails(listingId);
            res.json({
                success: true,
                data: details
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Ürün detayları getirilirken hata oluştu'
            });
        }
    }

    // Sipariş detayları
    public getOrderDetails = async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const details = await this.etsyService.getOrderDetails(orderId);
            res.json({
                success: true,
                data: details
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Sipariş detayları getirilirken hata oluştu'
            });
        }
    }
} 