"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'User API çalışıyor' });
});
// User routes
router.get('/users', userController.getUsers);
router.post('/users/mock', userController.createMockUser);
exports.default = router;
