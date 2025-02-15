import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();
const orderController = new OrderController();

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

export default router; 