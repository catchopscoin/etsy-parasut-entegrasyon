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
exports.UserService = void 0;
const User_1 = require("../models/User");
const DatabaseService_1 = require("./DatabaseService");
class UserService {
    constructor() {
        this.userRepository = DatabaseService_1.DatabaseService.getInstance().getRepository(User_1.User);
    }
    // Tüm kullanıcıları getir
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    // ID'ye göre kullanıcı getir
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['orders']
            });
        });
    }
    // Mock kullanıcı oluştur
    createMockUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.name = "Test Kullanıcı";
            user.email = "test@example.com";
            user.phone = "+90 555 555 5555";
            user.etsyUserId = "ETSY-USER-123";
            return yield this.userRepository.save(user);
        });
    }
}
exports.UserService = UserService;
