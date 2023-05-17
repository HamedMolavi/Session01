import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
};

export class GetUserDto {
    id?: number;

    email: string;

    username: string;
};
export class UpdateUserDto {
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsEmail()
    email?: string;

    username?: string;

    password?: string;
};