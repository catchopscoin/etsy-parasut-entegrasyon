import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    INVOICED = 'invoiced',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    etsyOrderId!: string;

    @ManyToOne(() => User)
    user!: User;

    @Column('decimal')
    totalAmount!: number;

    @Column()
    currency!: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status!: OrderStatus;

    @Column({ nullable: true })
    parasutInvoiceId?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToMany(() => Product)
    @JoinTable()
    products!: Product[];

    @Column('decimal', { array: true, nullable: true })
    quantities!: number[];
} 