import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { // Do NOT validate here please. Create a schema for it later.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  // @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  email: string;
}