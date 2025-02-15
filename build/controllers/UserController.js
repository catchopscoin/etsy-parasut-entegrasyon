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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        // Kullanıcı listesi
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const users = yield this.userService.getAllUsers();
                res.json({
                    success: true,
                    data: users
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Kullanıcılar getirilirken bir hata oluştu'
                });
            }
        });
        // Mock kullanıcı oluştur
        this.createMockUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureServiceInitialized();
                const user = yield this.userService.createMockUser();
                res.json({
                    success: true,
                    message: 'Test kullanıcısı oluşturuldu',
                    data: user
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Kullanıcı oluşturulurken bir hata oluştu'
                });
            }
        });
        this.initializeService();
    }
    initializeService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userService = new UserService_1.UserService();
            }
            catch (error) {
                console.error('UserService başlatma hatası:', error);
            }
        });
    }
    ensureServiceInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.userService) {
                yield this.initializeService();
            }
        });
    }
}
exports.UserController = UserController;
