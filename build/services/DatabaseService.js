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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
class DatabaseService {
    constructor() {
        this.dataSource = new typeorm_1.DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || '1234',
            database: process.env.DB_DATABASE || 'etsy_parasut_db',
            entities: [User_1.User, Product_1.Product, Order_1.Order],
            synchronize: true,
            logging: true // Hata ayıklama için logging'i açalım
        });
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dataSource.initialize();
        });
    }
    getRepository(entity) {
        return this.dataSource.getRepository(entity);
    }
}
exports.DatabaseService = DatabaseService;
