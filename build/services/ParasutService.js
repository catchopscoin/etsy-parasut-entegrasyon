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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParasutService = void 0;
const axios_1 = __importDefault(require("axios"));
const parasutConfig_1 = require("../config/parasutConfig");
class ParasutService {
    constructor() {
        this.baseUrl = parasutConfig_1.parasutConfig.baseUrl;
        this.companyId = parasutConfig_1.parasutConfig.companyId;
        this.accessToken = null;
    }
    getHeaders() {
        if (!this.accessToken) {
            throw new Error('Access token gerekli');
        }
        return {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
    }
    // Token al
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.baseUrl}/oauth/token`, {
                    client_id: parasutConfig_1.parasutConfig.clientId,
                    client_secret: parasutConfig_1.parasutConfig.clientSecret,
                    grant_type: 'client_credentials',
                    redirect_uri: parasutConfig_1.parasutConfig.redirectUri
                });
                this.accessToken = response.data.access_token;
                return response.data;
            }
            catch (error) {
                console.error('Parasut auth hatası:', error);
                throw error;
            }
        });
    }
    // Fatura oluştur
    createInvoice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.baseUrl}/${this.companyId}/sales_invoices`, {
                    data: {
                        type: 'sales_invoices',
                        attributes: {
                            description: data.description,
                            issue_date: data.issueDate,
                            due_date: data.dueDate,
                            currency: data.currency,
                            total: data.totalAmount
                        },
                        relationships: {
                            contact: {
                                data: {
                                    id: data.contactId,
                                    type: 'contacts'
                                }
                            }
                        }
                    }
                }, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Parasut fatura oluşturma hatası:', error);
                throw error;
            }
        });
    }
    // Müşteri oluştur/güncelle
    upsertContact(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.baseUrl}/${this.companyId}/contacts`, {
                    data: {
                        type: 'contacts',
                        attributes: {
                            name: data.name,
                            email: data.email,
                            tax_number: data.taxNumber,
                            tax_office: data.taxOffice,
                            category: data.category,
                            contact_type: data.contactType
                        }
                    }
                }, { headers: this.getHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Parasut müşteri oluşturma hatası:', error);
                throw error;
            }
        });
    }
}
exports.ParasutService = ParasutService;
