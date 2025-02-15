import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    etsyUserId?: string;

    @Column({ nullable: true })
    parasutContactId?: string;

    @OneToMany(() => Order, order => order.user)
    orders!: Order[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 