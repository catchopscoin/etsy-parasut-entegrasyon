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
exports.ProductService = void 0;
const Product_1 = require("../models/Product");
const DatabaseService_1 = require("./DatabaseService");
const api_1 = __importDefault(require("./api"));
const api_2 = require("../config/api");
class ProductService {
    constructor() {
        this.productRepository = DatabaseService_1.DatabaseService.getInstance().getRepository(Product_1.Product);
    }
    // Tüm ürünleri getir
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.find();
        });
    }
    // ID'ye göre ürün getir
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findOne({ where: { id: parseInt(id) } });
        });
    }
    // Etsy ile senkronizasyon (API key olmadan mock data)
    syncWithEtsy() {
        return __awaiter(this, void 0, void 0, function* () {
            // API key olmadığı için mock veri
            const mockProduct = new Product_1.Product();
            mockProduct.title = "Test Ürün";
            mockProduct.description = "Test Açıklama";
            mockProduct.price = 99.99;
            mockProduct.currency = "USD";
            mockProduct.etsyId = "12345";
            mockProduct.quantity = 10;
            mockProduct.tags = ["test", "mock"];
            mockProduct.images = ["image1.jpg", "image2.jpg"];
            return yield this.productRepository.save(mockProduct);
        });
    }
    // Günlük istatistikler
    getDailyStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalProducts = yield this.productRepository.count();
            const outOfStock = yield this.productRepository.count({ where: { quantity: 0 } });
            return {
                totalProducts,
                outOfStock,
                lastUpdate: new Date()
            };
        });
    }
    // Tüm ürünleri getir
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.get(api_2.endpoints.products);
            return response.data;
        });
    }
    // Etsy'den senkronize et
    syncFromEtsy() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.post(`${api_2.endpoints.products}/sync`);
            return response.data;
        });
    }
    // Ürün detayı getir
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.get(`${api_2.endpoints.products}/${id}`);
            return response.data;
        });
    }
    // Yeni ürün ekle
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.post(api_2.endpoints.products, product);
            return response.data;
        });
    }
}
exports.ProductService = ProductService;
