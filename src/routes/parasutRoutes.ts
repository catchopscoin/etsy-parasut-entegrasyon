import { Router } from 'express';
import { ParasutController } from '../controllers/ParasutController';

const router = Router();
const parasutController = new ParasutController();

// Invoice routes
router.post('/parasut/invoices', parasutController.createInvoice);

// Contact routes
router.post('/parasut/contacts', parasutController.createContact);

export default router; 