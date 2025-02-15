"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const Sidebar_1 = __importDefault(require("./Sidebar"));
const Header_1 = __importDefault(require("./Header"));
const routes_1 = __importDefault(require("../../routes"));
const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(true);
    return (<material_1.Box sx={{ display: 'flex' }}>
      <Header_1.default onMenuClick={() => setSidebarOpen(!sidebarOpen)}/>
      <Sidebar_1.default open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      <material_1.Box component="main" sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            backgroundColor: 'background.default',
            minHeight: '100vh',
        }}>
        <routes_1.default />
      </material_1.Box>
    </material_1.Box>);
};
exports.default = Layout;
