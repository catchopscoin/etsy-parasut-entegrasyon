import { Router } from 'express';
import { EtsyController } from '../controllers/EtsyController';

const router = Router();
const etsyController = new EtsyController();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Etsy API çalışıyor' });
});

// OAuth routes
router.get('/etsy/auth', etsyController.startAuth);
router.get('/etsy/callback', etsyController.handleCallback);

// Shop routes
router.get('/etsy/shop', etsyController.getShopInfo);

// Listing routes
router.get('/etsy/listings', etsyController.getListings);
router.get('/etsy/listings/:listingId', etsyController.getListingDetails);
router.get('/etsy/listings/:listingId/images', etsyController.getListingImages);
router.get('/etsy/listings/:listingId/inventory', etsyController.getListingInventory);

// Order routes
router.get('/etsy/orders', etsyController.getOrders);
router.get('/etsy/orders/:orderId', etsyController.getOrderDetails);
router.get('/etsy/orders/:orderId/items', etsyController.getOrderItems);

export default router; 