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
exports.OrderController = void 0;
const OrderService_1 = require("../services/OrderService");
const Order_1 = require("../models/Order");
class OrderController {
    constructor() {
        // Sipariş listesi
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const orders = yield this.orderService.getAllOrders();
                res.json({
                    success: true,
                    data: orders
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Siparişler getirilirken bir hata oluştu'
                });
            }
        });
        // Tekil sipariş detayı
        this.getOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const { id } = req.params;
                const order = yield this.orderService.getOrderById(id);
                if (!order) {
                    return res.status(404).json({
                        success: false,
                        error: 'Sipariş bulunamadı'
                    });
                }
                res.json({
                    success: true,
                    data: order
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Sipariş detayı getirilirken bir hata oluştu'
                });
            }
        });
        // Etsy siparişlerini senkronize et
        this.syncOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const result = yield this.orderService.syncWithEtsy();
                res.json({
                    success: true,
                    message: 'Siparişler senkronize edildi',
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
        // Parasut faturası oluştur
        this.createInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const { orderId } = req.params;
                const result = yield this.orderService.createParasutInvoice(orderId);
                res.json({
                    success: true,
                    message: 'Fatura oluşturuldu',
                    data: result
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Fatura oluşturulurken bir hata oluştu'
                });
            }
        });
        // Yeni sipariş oluştur
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const orderData = req.body;
                const result = yield this.orderService.createOrder(orderData);
                res.json({
                    success: true,
                    message: 'Sipariş oluşturuldu',
                    data: result
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Sipariş oluşturulurken bir hata oluştu'
                });
            }
        });
        // Sipariş durumunu güncelle
        this.updateStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const { orderId } = req.params;
                const { status } = req.body;
                // Status kontrolü
                if (!Object.values(Order_1.OrderStatus).includes(status)) {
                    return res.status(400).json({
                        success: false,
                        error: 'Geçersiz sipariş durumu'
                    });
                }
                const result = yield this.orderService.updateOrderStatus(orderId, status);
                res.json({
                    success: true,
                    message: 'Sipariş durumu güncellendi',
                    data: result
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Sipariş durumu güncellenirken bir hata oluştu'
                });
            }
        });
        this.initializeService();
    }
    initializeService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.orderService = new OrderService_1.OrderService();
            }
            catch (error) {
                console.error('OrderService başlatma hatası:', error);
            }
        });
    }
    ensureServiceInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.orderService) {
                yield this.initializeService();
            }
        });
    }
}
exports.OrderController = OrderController;
