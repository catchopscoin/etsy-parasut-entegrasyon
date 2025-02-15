"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DatabaseService_1 = require("./services/DatabaseService");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const etsyRoutes_1 = __importDefault(require("./routes/etsyRoutes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = (0, express_1.default)();
        // Middleware
        app.use(express_1.default.json());
        // Routes
        app.use('/api', productRoutes_1.default);
        app.use('/api', orderRoutes_1.default);
        app.use('/api', userRoutes_1.default);
        app.use('/api', etsyRoutes_1.default);
        // Database connection
        yield DatabaseService_1.DatabaseService.getInstance().initialize();
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portunda çalışıyor`);
        });
    }
    catch (error) {
        console.error('Server başlatma hatası:', error);
        process.exit(1);
    }
});
startServer();
