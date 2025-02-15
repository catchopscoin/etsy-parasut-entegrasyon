import { Repository } from 'typeorm';
import { Product } from '../models/Product';
import { DatabaseService } from './DatabaseService';
import api from './api';
import { endpoints } from '../config/api';

export class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = DatabaseService.getInstance().getRepository<Product>(Product);
    }

    // Tüm ürünleri getir
    public async getAllProducts() {
        return await this.productRepository.find();
    }

    // ID'ye göre ürün getir
    public async getProductById(id: string) {
        return await this.productRepository.findOne({ where: { id: parseInt(id) } });
    }

    // Etsy ile senkronizasyon (API key olmadan mock data)
    public async syncWithEtsy() {
        // API key olmadığı için mock veri
        const mockProduct = new Product();
        mockProduct.title = "Test Ürün";
        mockProduct.description = "Test Açıklama";
        mockProduct.price = 99.99;
        mockProduct.currency = "USD";
        mockProduct.etsyId = "12345";
        mockProduct.quantity = 10;
        mockProduct.tags = ["test", "mock"];
        mockProduct.images = ["image1.jpg", "image2.jpg"];

        return await this.productRepository.save(mockProduct);
    }

    // Günlük istatistikler
    public async getDailyStats() {
        const totalProducts = await this.productRepository.count();
        const outOfStock = await this.productRepository.count({ where: { quantity: 0 } });

        return {
            totalProducts,
            outOfStock,
            lastUpdate: new Date()
        };
    }

    // Tüm ürünleri getir
    public async getProducts() {
        const response = await api.get(endpoints.products);
        return response.data;
    }

    // Etsy'den senkronize et
    public async syncFromEtsy() {
        const response = await api.post(`${endpoints.products}/sync`);
        return response.data;
    }

    // Ürün detayı getir
    public async getProduct(id: number) {
        const response = await api.get(`${endpoints.products}/${id}`);
        return response.data;
    }

    // Yeni ürün ekle
    public async createProduct(product: Partial<Product>) {
        const response = await api.post(endpoints.products, product);
        return response.data;
    }
} 