import { Request, Response } from 'express';
import { ParasutService } from '../services/ParasutService';

export class ParasutController {
    private parasutService: ParasutService;

    constructor() {
        this.parasutService = new ParasutService();
    }

    // Fatura oluştur
    public createInvoice = async (req: Request, res: Response) => {
        try {
            await this.parasutService.authenticate();
            const invoice = await this.parasutService.createInvoice(req.body);
            res.json({
                success: true,
                data: invoice
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Fatura oluşturulurken hata oluştu'
            });
        }
    }

    // Müşteri oluştur
    public createContact = async (req: Request, res: Response) => {
        try {
            await this.parasutService.authenticate();
            const contact = await this.parasutService.upsertContact(req.body);
            res.json({
                success: true,
                data: contact
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Müşteri oluşturulurken hata oluştu'
            });
        }
    }
} 