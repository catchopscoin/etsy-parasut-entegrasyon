"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const DataTable_1 = __importDefault(require("../DataTable"));
const redux_1 = require("../../hooks/redux");
const productSlice_1 = require("../../store/slices/productSlice");
const columns = [
    { id: 'title', label: 'Ürün Adı', minWidth: 170 },
    { id: 'price', label: 'Fiyat', minWidth: 100, align: 'right',
        format: (value) => value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' }) },
    { id: 'quantity', label: 'Stok', minWidth: 100, align: 'right' },
    { id: 'etsyId', label: 'Etsy ID', minWidth: 130 },
    { id: 'createdAt', label: 'Oluşturulma Tarihi', minWidth: 170,
        format: (value) => new Date(value).toLocaleDateString('tr-TR') }
];
const ProductTable = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const { items, loading } = (0, redux_1.useAppSelector)(state => state.products);
    (0, react_1.useEffect)(() => {
        dispatch((0, productSlice_1.fetchProducts)());
    }, [dispatch]);
    return (<DataTable_1.default columns={columns} rows={items} loading={loading} onEdit={(row) => console.log('Edit:', row)} onDelete={(row) => console.log('Delete:', row)}/>);
};
exports.default = ProductTable;
