import api from './api';
import { endpoints } from '../config/api';
import { Order } from '../store/types';

export class OrderService {
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

  // Sipariş detayı getir
  public async getOrder(id: number) {
    const response = await api.get(`${endpoints.orders}/${id}`);
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