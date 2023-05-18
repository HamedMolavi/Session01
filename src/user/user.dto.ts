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
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    username?: string;

    @IsOptional()
    password?: string;
};