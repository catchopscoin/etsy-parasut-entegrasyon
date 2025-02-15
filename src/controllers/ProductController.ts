import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
    private productService!: ProductService; // '!' işareti ile kesin atama yapılacağını belirtiyoruz

    constructor() {
        // ProductService'i constructor'da başlat
        this.initializeService();
    }

    private async initializeService() {
        try {
            this.productService = new ProductService();
        } catch (error) {
            console.error('ProductService başlatma hatası:', error);
            // Hatayı yukarı fırlat
            throw error;
        }
    }

    // Ürün listesi
    public getProducts = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const products = await this.productService.getAllProducts();
            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Ürünler getirilirken bir hata oluştu'
            });
        }
    }

    // Tekil ürün detayı
    public getProduct = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Ürün bulunamadı'
                });
            }

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Ürün detayı getirilirken bir hata oluştu'
            });
        }
    }

    // Etsy ile senkronizasyon
    public syncProducts = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const result = await this.productService.syncWithEtsy();
            res.json({
                success: true,
                message: 'Ürünler senkronize edildi',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Senkronizasyon sırasında bir hata oluştu'
            });
        }
    }

    // Günlük istatistikler
    public getDailyStats = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const stats = await this.productService.getDailyStats();
            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'İstatistikler getirilirken bir hata oluştu'
            });
        }
    }

    private async ensureServiceInitialized() {
        if (!this.productService) {
            await this.initializeService();
        }
    }
} 