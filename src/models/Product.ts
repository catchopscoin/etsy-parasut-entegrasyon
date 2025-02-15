import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    etsyId!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column('decimal')
    price!: number;

    @Column()
    currency!: string;

    @Column('simple-array')
    tags!: string[];

    @Column('simple-array')
    images!: string[];

    @Column()
    quantity!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 