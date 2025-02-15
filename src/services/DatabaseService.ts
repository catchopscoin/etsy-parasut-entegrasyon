import { DataSource, ObjectLiteral, EntityTarget } from 'typeorm';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

export class DatabaseService {
    private static instance: DatabaseService;
    public dataSource: DataSource;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || '1234',
            database: process.env.DB_DATABASE || 'etsy_parasut_db',
            entities: [User, Product, Order],
            synchronize: true,
            logging: true  // Hata ayıklama için logging'i açalım
        });
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async initialize(): Promise<DataSource> {
        return await this.dataSource.initialize();
    }

    public getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>) {
        return this.dataSource.getRepository<T>(entity);
    }
} 