"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const Add_1 = __importDefault(require("@mui/icons-material/Add"));
const Sync_1 = __importDefault(require("@mui/icons-material/Sync"));
const redux_1 = require("../../hooks/redux");
const productSlice_1 = require("../../store/slices/productSlice");
const ProductTable_1 = __importDefault(require("../../components/ProductTable"));
const ProductForm_1 = __importDefault(require("../../components/ProductForm"));
const Products = () => {
    const dispatch = (0, redux_1.useAppDispatch)();
    const [isFormOpen, setIsFormOpen] = (0, react_1.useState)(false);
    const handleSync = () => {
        dispatch((0, productSlice_1.syncProducts)());
    };
    return (<material_1.Box>
      <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <material_1.Typography variant="h4">Ürünler</material_1.Typography>
        <material_1.Box>
          <material_1.Button variant="contained" startIcon={<Sync_1.default />} onClick={handleSync} sx={{ mr: 2 }}>
            Etsy'den Senkronize Et
          </material_1.Button>
          <material_1.Button variant="contained" startIcon={<Add_1.default />} onClick={() => setIsFormOpen(true)}>
            Yeni Ürün
          </material_1.Button>
        </material_1.Box>
      </material_1.Box>
      <ProductTable_1.default />
      <ProductForm_1.default open={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={(data) => {
            console.log('New Product:', data);
            setIsFormOpen(false);
        }}/>
    </material_1.Box>);
};
exports.default = Products;
