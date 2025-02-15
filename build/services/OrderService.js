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
exports.OrderService = void 0;
const Order_1 = require("../models/Order");
const DatabaseService_1 = require("./DatabaseService");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
const Order_2 = require("../models/Order");
const api_1 = __importDefault(require("./api"));
const api_2 = require("../config/api");
class OrderService {
    constructor() {
        this.orderRepository = DatabaseService_1.DatabaseService.getInstance().getRepository(Order_1.Order);
    }
    // Tüm siparişleri getir
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.find({
                relations: ['user']
            });
        });
    }
    // ID'ye göre sipariş getir
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['user']
            });
        });
    }
    // Etsy'den siparişleri senkronize et
    syncWithEtsy() {
        return __awaiter(this, void 0, void 0, function* () {
            const mockOrder = new Order_1.Order();
            mockOrder.etsyOrderId = "ETSY-123456";
            mockOrder.totalAmount = 199.99;
            mockOrder.currency = "USD";
            mockOrder.status = Order_2.OrderStatus.PENDING;
            // User ilişkisi daha sonra eklenecek
            return yield this.orderRepository.save(mockOrder);
        });
    }
    // Parasut'a fatura oluştur
    createParasutInvoice(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ID kontrolü
                if (!orderId) {
                    throw new Error('Sipariş ID\'si gerekli');
                }
                const order = yield this.getOrderById(orderId);
                if (!order) {
                    throw new Error(`ID: ${orderId} olan sipariş bulunamadı`);
                }
                // Fatura zaten oluşturulmuş mu kontrolü
                if (order.parasutInvoiceId) {
                    throw new Error(`Bu sipariş için zaten fatura oluşturulmuş. Fatura No: ${order.parasutInvoiceId}`);
                }
                // Mock Parasut entegrasyonu
                const parasutInvoiceId = `PRS-${Date.now()}`;
                order.parasutInvoiceId = parasutInvoiceId;
                order.status = Order_2.OrderStatus.INVOICED;
                const savedOrder = yield this.orderRepository.save(order);
                return {
                    orderId: savedOrder.id,
                    parasutInvoiceId: savedOrder.parasutInvoiceId,
                    status: savedOrder.status,
                    message: 'Fatura başarıyla oluşturuldu'
                };
            }
            catch (error) {
                console.error('Fatura oluşturma hatası:', error);
                throw error;
            }
        });
    }
    // Sipariş istatistikleri
    getOrderStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalOrders = yield this.orderRepository.count();
            const pendingOrders = yield this.orderRepository.count({
                where: { status: Order_2.OrderStatus.PENDING }
            });
            const totalRevenue = yield this.orderRepository
                .createQueryBuilder('order')
                .select('SUM(order.totalAmount)', 'total')
                .getRawOne();
            return {
                totalOrders,
                pendingOrders,
                totalRevenue: (totalRevenue === null || totalRevenue === void 0 ? void 0 : totalRevenue.total) || 0
            };
        });
    }
    // Sipariş oluştur
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new Order_1.Order();
            // User kontrolü
            const user = yield DatabaseService_1.DatabaseService.getInstance().getRepository(User_1.User).findOneBy({ id: orderData.userId });
            if (!user) {
                throw new Error('Kullanıcı bulunamadı');
            }
            order.user = user;
            // Product kontrolü
            const products = yield DatabaseService_1.DatabaseService.getInstance().getRepository(Product_1.Product).findByIds(orderData.products.map(p => p.id));
            if (products.length !== orderData.products.length) {
                throw new Error('Bazı ürünler bulunamadı');
            }
            order.products = products;
            // Diğer alanları doldur
            order.etsyOrderId = `MANUAL-${Date.now()}`; // Manuel oluşturulan siparişler için
            order.quantities = orderData.products.map(p => p.quantity);
            order.totalAmount = orderData.totalAmount;
            order.currency = orderData.currency;
            order.status = Order_2.OrderStatus.PENDING;
            return yield this.orderRepository.save(order);
        });
    }
    // Sipariş durumunu güncelle
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.getOrderById(orderId);
            if (!order) {
                throw new Error('Sipariş bulunamadı');
            }
            order.status = status;
            return yield this.orderRepository.save(order);
        });
    }
    // Tüm siparişleri getir
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.get(api_2.endpoints.orders);
            return response.data;
        });
    }
    // Etsy'den senkronize et
    syncFromEtsy() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.post(`${api_2.endpoints.orders}/sync`);
            return response.data;
        });
    }
    // Fatura oluştur
    createInvoice(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.post(`${api_2.endpoints.orders}/${orderId}/invoice`);
            return response.data;
        });
    }
    // Toplu fatura oluştur
    createBulkInvoices(orderIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.post(`${api_2.endpoints.orders}/bulk-invoice`, { orderIds });
            return response.data;
        });
    }
}
exports.OrderService = OrderService;
