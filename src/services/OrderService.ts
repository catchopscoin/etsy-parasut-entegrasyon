import { Repository } from 'typeorm';
import { Order } from '../models/Order';
import { DatabaseService } from './DatabaseService';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { OrderStatus } from '../models/Order';
import api from './api';
import { endpoints } from '../config/api';

export class OrderService {
    private orderRepository: Repository<Order>;

    constructor() {
        this.orderRepository = DatabaseService.getInstance().getRepository<Order>(Order);
    }

    // Tüm siparişleri getir
    public async getAllOrders() {
        return await this.orderRepository.find({
            relations: ['user']
        });
    }

    // ID'ye göre sipariş getir
    public async getOrderById(id: string) {
        return await this.orderRepository.findOne({
            where: { id: parseInt(id) },
            relations: ['user']
        });
    }

    // Etsy'den siparişleri senkronize et
    public async syncWithEtsy() {
        const mockOrder = new Order();
        mockOrder.etsyOrderId = "ETSY-123456";
        mockOrder.totalAmount = 199.99;
        mockOrder.currency = "USD";
        mockOrder.status = OrderStatus.PENDING;
        // User ilişkisi daha sonra eklenecek

        return await this.orderRepository.save(mockOrder);
    }

    // Parasut'a fatura oluştur
    public async createParasutInvoice(orderId: string) {
        try {
            // ID kontrolü
            if (!orderId) {
                throw new Error('Sipariş ID\'si gerekli');
            }

            const order = await this.getOrderById(orderId);
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
            order.status = OrderStatus.INVOICED;
            
            const savedOrder = await this.orderRepository.save(order);
            
            return {
                orderId: savedOrder.id,
                parasutInvoiceId: savedOrder.parasutInvoiceId,
                status: savedOrder.status,
                message: 'Fatura başarıyla oluşturuldu'
            };

        } catch (error) {
            console.error('Fatura oluşturma hatası:', error);
            throw error;
        }
    }

    // Sipariş istatistikleri
    public async getOrderStats() {
        const totalOrders = await this.orderRepository.count();
        const pendingOrders = await this.orderRepository.count({ 
            where: { status: OrderStatus.PENDING } 
        });
        const totalRevenue = await this.orderRepository
            .createQueryBuilder('order')
            .select('SUM(order.totalAmount)', 'total')
            .getRawOne();

        return {
            totalOrders,
            pendingOrders,
            totalRevenue: totalRevenue?.total || 0
        };
    }

    // Sipariş oluştur
    public async createOrder(orderData: {
        userId: number;
        products: { id: number; quantity: number; }[];
        totalAmount: number;
        currency: string;
    }) {
        const order = new Order();
        
        // User kontrolü
        const user = await DatabaseService.getInstance().getRepository(User).findOneBy({ id: orderData.userId });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        order.user = user;

        // Product kontrolü
        const products = await DatabaseService.getInstance().getRepository(Product).findByIds(
            orderData.products.map(p => p.id)
        );
        if (products.length !== orderData.products.length) {
            throw new Error('Bazı ürünler bulunamadı');
        }
        order.products = products;

        // Diğer alanları doldur
        order.etsyOrderId = `MANUAL-${Date.now()}`; // Manuel oluşturulan siparişler için
        order.quantities = orderData.products.map(p => p.quantity);
        order.totalAmount = orderData.totalAmount;
        order.currency = orderData.currency;
        order.status = OrderStatus.PENDING;
        
        return await this.orderRepository.save(order);
    }

    // Sipariş durumunu güncelle
    public async updateOrderStatus(orderId: string, status: OrderStatus) {
        const order = await this.getOrderById(orderId);
        if (!order) {
            throw new Error('Sipariş bulunamadı');
        }
        
        order.status = status;
        return await this.orderRepository.save(order);
    }

    // Tüm siparişleri getir
    public async getOrders() {
        const response = await api.get(endpoints.orders);
        return response.data;
    }

    // Etsy'den senkronize et
    public async syncFromEtsy() {
        const response = await api.post(`${endpoints.orders}/sync`);
        return response.data;
    }

    // Fatura oluştur
    public async createInvoice(orderId: number) {
        const response = await api.post(`${endpoints.orders}/${orderId}/invoice`);
        return response.data;
    }

    // Toplu fatura oluştur
    public async createBulkInvoices(orderIds: number[]) {
        const response = await api.post(`${endpoints.orders}/bulk-invoice`, { orderIds });
        return response.data;
    }
} 