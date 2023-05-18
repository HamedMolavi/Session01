import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { // Do NOT validate here please. Create a schema for it later.
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;

  @Column({ default: 'user', enum: ['user', 'admin'] })
  role: string;
}