"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const DataTable_1 = __importDefault(require("../DataTable"));
const redux_1 = require("../../hooks/redux");
const orderSlice_1 = require("../../store/slices/orderSlice");
const material_1 = require("@mui/material");
const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'warning';
        case 'COMPLETED':
            return 'success';
        case 'CANCELLED':
            return 'error';
        default:
            return 'default';
    }
};
const columns = [
    { id: 'etsyOrderId', label: 'Etsy Sipariş No', minWidth: 130 },
    {
        id: 'totalAmount',
        label: 'Tutar',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
    },
    {
        id: 'status',
        label: 'Durum',
        minWidth: 100,
        format: (value) => (<material_1.Chip label={value} color={getStatusColor(value)} size="small"/>)
    },
    { id: 'parasutInvoiceId', label: 'Parasut Fatura No', minWidth: 130 },
    {
        id: 'createdAt',
        label: 'Tarih',
        minWidth: 170,
        format: (value) => new Date(value).toLocaleDateString('tr-TR')
    }
];
const OrderTable = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const { items, loading } = (0, redux_1.useAppSelector)(state => state.orders);
    (0, react_1.useEffect)(() => {
        dispatch((0, orderSlice_1.fetchOrders)());
    }, [dispatch]);
    return (<DataTable_1.default columns={columns} rows={items} loading={loading} onEdit={(row) => console.log('Edit:', row)}/>);
};
exports.default = OrderTable;
