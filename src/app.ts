import 'reflect-metadata';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';
import { DatabaseService } from './services/DatabaseService';

// Route imports
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import etsyRoutes from './routes/etsyRoutes';
import parasutRoutes from './routes/parasutRoutes';

dotenv.config();

class App {
    public app: Application;
    private db: DatabaseService;

    constructor() {
        this.app = express();
        this.db = DatabaseService.getInstance();
    }

    async initialize() {
        try {
            this.initializeMiddlewares();
            this.initializeRoutes();
            this.initializeErrorHandling();
            return this;
        } catch (error) {
            console.error('Uygulama başlatma hatası:', error);
            throw error;
        }
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('API Çalışıyor');
        });
        
        // Ürün route'larını ekle
        this.app.use('/api', productRoutes);
        this.app.use('/api', orderRoutes);  // Order route'larını ekle
        this.app.use('/api', userRoutes);  // User route'larını ekle
        this.app.use('/api', etsyRoutes);  // Etsy route'larını ekle
        this.app.use('/api', parasutRoutes);  // Parasut route'larını ekle
    }

    private initializeErrorHandling() {
        this.app.use(errorHandler);
    }
}

export default App; 