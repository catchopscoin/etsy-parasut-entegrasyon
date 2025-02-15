"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParasutController = void 0;
const ParasutService_1 = require("../services/ParasutService");
class ParasutController {
    constructor() {
        // Fatura oluştur
        this.createInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.parasutService.authenticate();
                const invoice = yield this.parasutService.createInvoice(req.body);
                res.json({
                    success: true,
                    data: invoice
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Fatura oluşturulurken hata oluştu'
                });
            }
        });
        // Müşteri oluştur
        this.createContact = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.parasutService.authenticate();
                const contact = yield this.parasutService.upsertContact(req.body);
                res.json({
                    success: true,
                    data: contact
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Müşteri oluşturulurken hata oluştu'
                });
            }
        });
        this.parasutService = new ParasutService_1.ParasutService();
    }
}
exports.ParasutController = ParasutController;
