"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const Sync_1 = __importDefault(require("@mui/icons-material/Sync"));
const Receipt_1 = __importDefault(require("@mui/icons-material/Receipt"));
const redux_1 = require("../../hooks/redux");
const orderSlice_1 = require("../../store/slices/orderSlice");
const OrderTable_1 = __importDefault(require("../../components/OrderTable"));
const OrderForm_1 = __importDefault(require("../../components/OrderForm"));
const Orders = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const [isFormOpen, setIsFormOpen] = (0, react_1.useState)(false);
    const handleSync = () => {
        dispatch((0, orderSlice_1.syncOrders)());
    };
    return (<material_1.Box>
      <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <material_1.Typography variant="h4">Siparişler</material_1.Typography>
        <material_1.Box>
          <material_1.Button variant="contained" startIcon={<Sync_1.default />} onClick={handleSync} sx={{ mr: 2 }}>
            Etsy'den Senkronize Et
          </material_1.Button>
          <material_1.Button variant="contained" color="secondary" startIcon={<Receipt_1.default />}>
            Toplu Fatura Oluştur
          </material_1.Button>
        </material_1.Box>
      </material_1.Box>
      <OrderTable_1.default />
      <OrderForm_1.default open={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={(data) => {
            console.log('New Order:', data);
            setIsFormOpen(false);
        }}/>
    </material_1.Box>);
};
exports.default = Orders;
