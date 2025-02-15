import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { DatabaseService } from './services/DatabaseService';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import etsyRoutes from './routes/etsyRoutes';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        const app = express();
        
        // Middleware
        app.use(express.json());
        
        // Routes
        app.use('/api', productRoutes);
        app.use('/api', orderRoutes);
        app.use('/api', userRoutes);
        app.use('/api', etsyRoutes);

        // Database connection
        await DatabaseService.getInstance().initialize();
        
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portunda çalışıyor`);
        });
    } catch (error) {
        console.error('Server başlatma hatası:', error);
        process.exit(1);
    }
};

startServer(); 