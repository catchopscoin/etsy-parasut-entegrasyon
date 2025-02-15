import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { OrderStatus } from '../models/Order';

export class OrderController {
    private orderService!: OrderService;

    constructor() {
        this.initializeService();
    }

    private async initializeService() {
        try {
            this.orderService = new OrderService();
        } catch (error) {
            console.error('OrderService başlatma hatası:', error);
        }
    }

    // Sipariş listesi
    public getOrders = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const orders = await this.orderService.getAllOrders();
            res.json({
                success: true,
                data: orders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Siparişler getirilirken bir hata oluştu'
            });
        }
    }

    // Tekil sipariş detayı
    public getOrder = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            
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
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Sipariş detayı getirilirken bir hata oluştu'
            });
        }
    }

    // Etsy siparişlerini senkronize et
    public syncOrders = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const result = await this.orderService.syncWithEtsy();
            res.json({
                success: true,
                message: 'Siparişler senkronize edildi',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Senkronizasyon sırasında bir hata oluştu'
            });
        }
    }

    // Parasut faturası oluştur
    public createInvoice = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const { orderId } = req.params;
            const result = await this.orderService.createParasutInvoice(orderId);
            res.json({
                success: true,
                message: 'Fatura oluşturuldu',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Fatura oluşturulurken bir hata oluştu'
            });
        }
    }

    // Yeni sipariş oluştur
    public createOrder = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const orderData = req.body;
            const result = await this.orderService.createOrder(orderData);
            res.json({
                success: true,
                message: 'Sipariş oluşturuldu',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Sipariş oluşturulurken bir hata oluştu'
            });
        }
    }

    // Sipariş durumunu güncelle
    public updateStatus = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const { orderId } = req.params;
            const { status } = req.body;

            // Status kontrolü
            if (!Object.values(OrderStatus).includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: 'Geçersiz sipariş durumu'
                });
            }

            const result = await this.orderService.updateOrderStatus(orderId, status as OrderStatus);
            res.json({
                success: true,
                message: 'Sipariş durumu güncellendi',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Sipariş durumu güncellenirken bir hata oluştu'
            });
        }
    }

    private async ensureServiceInitialized() {
        if (!this.orderService) {
            await this.initializeService();
        }
    }
} 