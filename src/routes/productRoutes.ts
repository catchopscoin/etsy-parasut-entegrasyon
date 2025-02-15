import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

// Test route'u
router.get('/test', (req, res) => {
    res.json({ message: 'Product API çalışıyor' });
});

// Ürün route'ları - Önemli: Sıralama önemli!
router.get('/products/stats/daily', productController.getDailyStats);  // Bu üstte olmalı
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getProducts);
router.post('/products/sync', productController.syncProducts);

export default router; 