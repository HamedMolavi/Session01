import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class LoginDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;

    @Column({ default: true })
    rememberMe: boolean;
};

export class LogoutDto {
    @IsNotEmpty()
    token: string;
}