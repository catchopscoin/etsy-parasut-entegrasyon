"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const Dashboard_1 = __importDefault(require("@mui/icons-material/Dashboard"));
const ShoppingCart_1 = __importDefault(require("@mui/icons-material/ShoppingCart"));
const Inventory_1 = __importDefault(require("@mui/icons-material/Inventory"));
const Settings_1 = __importDefault(require("@mui/icons-material/Settings"));
const react_router_dom_1 = require("react-router-dom");
const menuItems = [
    { text: 'Dashboard', icon: <Dashboard_1.default />, path: '/' },
    { text: 'Siparişler', icon: <ShoppingCart_1.default />, path: '/orders' },
    { text: 'Ürünler', icon: <Inventory_1.default />, path: '/products' },
    { text: 'Ayarlar', icon: <Settings_1.default />, path: '/settings' },
];
const Sidebar = ({ open, onClose }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<material_1.Drawer variant="permanent" open={open} onClose={onClose} sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: 240,
                boxSizing: 'border-box',
            },
        }}>
      <material_1.Toolbar />
      <material_1.List>
        {menuItems.map((item) => (<material_1.ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <material_1.ListItemIcon>{item.icon}</material_1.ListItemIcon>
            <material_1.ListItemText primary={item.text}/>
          </material_1.ListItem>))}
      </material_1.List>
    </material_1.Drawer>);
};
exports.default = Sidebar;
