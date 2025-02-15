import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'User API çalışıyor' });
});

// User routes
router.get('/users', userController.getUsers);
router.post('/users/mock', userController.createMockUser);

export default router; 