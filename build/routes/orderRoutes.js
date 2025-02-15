"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const router = (0, express_1.Router)();
const orderController = new OrderController_1.OrderController();
// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Order API çalışıyor' });
});
// Order routes
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrder);
router.post('/orders/sync', orderController.syncOrders);
router.post('/orders/:orderId/invoice', orderController.createInvoice);
router.post('/orders', orderController.createOrder);
router.patch('/orders/:orderId/status', orderController.updateStatus);
exports.default = router;
