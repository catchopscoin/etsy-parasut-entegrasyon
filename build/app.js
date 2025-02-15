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
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const DatabaseService_1 = require("./services/DatabaseService");
// Route imports
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const etsyRoutes_1 = __importDefault(require("./routes/etsyRoutes"));
const parasutRoutes_1 = __importDefault(require("./routes/parasutRoutes"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.db = DatabaseService_1.DatabaseService.getInstance();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.initializeMiddlewares();
                this.initializeRoutes();
                this.initializeErrorHandling();
                return this;
            }
            catch (error) {
                console.error('Uygulama başlatma hatası:', error);
                throw error;
            }
        });
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('API Çalışıyor');
        });
        // Ürün route'larını ekle
        this.app.use('/api', productRoutes_1.default);
        this.app.use('/api', orderRoutes_1.default); // Order route'larını ekle
        this.app.use('/api', userRoutes_1.default); // User route'larını ekle
        this.app.use('/api', etsyRoutes_1.default); // Etsy route'larını ekle
        this.app.use('/api', parasutRoutes_1.default); // Parasut route'larını ekle
    }
    initializeErrorHandling() {
        this.app.use(errorHandler_1.default);
    }
}
exports.default = App;
