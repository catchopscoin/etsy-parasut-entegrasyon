import axios from 'axios';
import { parasutConfig } from '../config/parasutConfig';

export class ParasutService {
    private baseUrl: string;
    private accessToken: string | null;
    private companyId: string;

    constructor() {
        this.baseUrl = parasutConfig.baseUrl;
        this.companyId = parasutConfig.companyId;
        this.accessToken = null;
    }

    private getHeaders() {
        if (!this.accessToken) {
            throw new Error('Access token gerekli');
        }

        return {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
    }

    // Token al
    public async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/oauth/token`, {
                client_id: parasutConfig.clientId,
                client_secret: parasutConfig.clientSecret,
                grant_type: 'client_credentials',
                redirect_uri: parasutConfig.redirectUri
            });

            this.accessToken = response.data.access_token;
            return response.data;
        } catch (error) {
            console.error('Parasut auth hatası:', error);
            throw error;
        }
    }

    // Fatura oluştur
    public async createInvoice(data: {
        description: string;
        issueDate: string;
        dueDate: string;
        totalAmount: number;
        currency: string;
        contactId?: string;
    }) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${this.companyId}/sales_invoices`,
                {
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
                },
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Parasut fatura oluşturma hatası:', error);
            throw error;
        }
    }

    // Müşteri oluştur/güncelle
    public async upsertContact(data: {
        name: string;
        email: string;
        taxNumber?: string;
        taxOffice?: string;
        category?: string;
        contactType: 'person' | 'company';
    }) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${this.companyId}/contacts`,
                {
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
                },
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Parasut müşteri oluşturma hatası:', error);
            throw error;
        }
    }
} 