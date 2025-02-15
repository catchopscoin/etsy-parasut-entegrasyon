"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = __importDefault(require("../pages/Dashboard"));
const Orders_1 = __importDefault(require("../pages/Orders"));
const Products_1 = __importDefault(require("../pages/Products"));
const Settings_1 = __importDefault(require("../pages/Settings"));
const Routes = () => {
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route path="/" element={<Dashboard_1.default />}/>
      <react_router_dom_1.Route path="/orders" element={<Orders_1.default />}/>
      <react_router_dom_1.Route path="/products" element={<Products_1.default />}/>
      <react_router_dom_1.Route path="/settings" element={<Settings_1.default />}/>
    </react_router_dom_1.Routes>);
};
exports.default = Routes;
