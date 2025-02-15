import api from './api';
import { endpoints } from '../config/api';
import { Product } from '../store/types';

export class ProductService {
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