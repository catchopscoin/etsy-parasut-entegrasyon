"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const router = (0, express_1.Router)();
const productController = new ProductController_1.ProductController();
// Test route'u
router.get('/test', (req, res) => {
    res.json({ message: 'Product API çalışıyor' });
});
// Ürün route'ları - Önemli: Sıralama önemli!
router.get('/products/stats/daily', productController.getDailyStats); // Bu üstte olmalı
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getProducts);
router.post('/products/sync', productController.syncProducts);
exports.default = router;
