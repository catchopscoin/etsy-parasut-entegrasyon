export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    etsyId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: number;
    etsyOrderId: string;
    totalAmount: number;
    currency: string;
    status: string;
    parasutInvoiceId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface RootState {
    products: ProductState;
    orders: OrderState;
    settings: SettingsState;
}

export interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

export interface OrderState {
    items: Order[];
    loading: boolean;
    error: string | null;
}

export interface SettingsState {
    etsyApiKey: string;
    etsyApiSecret: string;
    parasutClientId: string;
    parasutClientSecret: string;
    parasutCompanyId: string;
} 