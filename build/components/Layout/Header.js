"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
const Header = ({ onMenuClick }) => {
    return (<material_1.AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <material_1.Toolbar>
        <material_1.IconButton color="inherit" aria-label="open drawer" onClick={onMenuClick} edge="start" sx={{ mr: 2 }}>
          <Menu_1.default />
        </material_1.IconButton>
        <material_1.Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Etsy-Parasut Entegrasyonu
        </material_1.Typography>
        <material_1.IconButton color="inherit">
          <AccountCircle_1.default />
        </material_1.IconButton>
      </material_1.Toolbar>
    </material_1.AppBar>);
};
exports.default = Header;
