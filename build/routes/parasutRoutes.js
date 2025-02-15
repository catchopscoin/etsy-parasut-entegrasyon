"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParasutController_1 = require("../controllers/ParasutController");
const router = (0, express_1.Router)();
const parasutController = new ParasutController_1.ParasutController();
// Invoice routes
router.post('/parasut/invoices', parasutController.createInvoice);
// Contact routes
router.post('/parasut/contacts', parasutController.createContact);
exports.default = router;
