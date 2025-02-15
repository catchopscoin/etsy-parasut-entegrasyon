"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EtsyController_1 = require("../controllers/EtsyController");
const router = (0, express_1.Router)();
const etsyController = new EtsyController_1.EtsyController();
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
exports.default = router;
