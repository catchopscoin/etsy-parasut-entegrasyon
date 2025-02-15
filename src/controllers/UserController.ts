import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService!: UserService;

    constructor() {
        this.initializeService();
    }

    private async initializeService() {
        try {
            this.userService = new UserService();
        } catch (error) {
            console.error('UserService başlatma hatası:', error);
        }
    }

    // Kullanıcı listesi
    public getUsers = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const users = await this.userService.getAllUsers();
            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Kullanıcılar getirilirken bir hata oluştu'
            });
        }
    }

    // Mock kullanıcı oluştur
    public createMockUser = async (req: Request, res: Response) => {
        try {
            await this.ensureServiceInitialized();
            const user = await this.userService.createMockUser();
            res.json({
                success: true,
                message: 'Test kullanıcısı oluşturuldu',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Kullanıcı oluşturulurken bir hata oluştu'
            });
        }
    }

    private async ensureServiceInitialized() {
        if (!this.userService) {
            await this.initializeService();
        }
    }
} 