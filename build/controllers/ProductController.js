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
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
class ProductController {
    constructor() {
        // Ürün listesi
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const products = yield this.productService.getAllProducts();
                res.json({
                    success: true,
                    data: products
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Ürünler getirilirken bir hata oluştu'
                });
            }
        });
        // Tekil ürün detayı
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const { id } = req.params;
                const product = yield this.productService.getProductById(id);
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Ürün detayı getirilirken bir hata oluştu'
                });
            }
        });
        // Etsy ile senkronizasyon
        this.syncProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const result = yield this.productService.syncWithEtsy();
                res.json({
                    success: true,
                    message: 'Ürünler senkronize edildi',
                    data: result
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Senkronizasyon sırasında bir hata oluştu'
                });
            }
        });
        // Günlük istatistikler
        this.getDailyStats = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const stats = yield this.productService.getDailyStats();
                res.json({
                    success: true,
                    data: stats
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'İstatistikler getirilirken bir hata oluştu'
                });
            }
        });
        // ProductService'i constructor'da başlat
        this.initializeService();
    }
    initializeService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.productService = new ProductService_1.ProductService();
            }
            catch (error) {
                console.error('ProductService başlatma hatası:', error);
                // Hatayı yukarı fırlat
                throw error;
            }
        });
    }
    ensureServiceInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.productService) {
                yield this.initializeService();
            }
        });
    }
}
exports.ProductController = ProductController;
