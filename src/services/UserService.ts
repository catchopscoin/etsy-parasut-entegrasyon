import { Repository } from 'typeorm';
import { User } from '../models/User';
import { DatabaseService } from './DatabaseService';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = DatabaseService.getInstance().getRepository<User>(User);
    }

    // Tüm kullanıcıları getir
    public async getAllUsers() {
        return await this.userRepository.find();
    }

    // ID'ye göre kullanıcı getir
    public async getUserById(id: string) {
        return await this.userRepository.findOne({
            where: { id: parseInt(id) },
            relations: ['orders']
        });
    }

    // Mock kullanıcı oluştur
    public async createMockUser() {
        const user = new User();
        user.name = "Test Kullanıcı";
        user.email = "test@example.com";
        user.phone = "+90 555 555 5555";
        user.etsyUserId = "ETSY-USER-123";
        
        return await this.userRepository.save(user);
    }
} 