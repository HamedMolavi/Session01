import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}

export class GetUserDto {
    id?: number;

    email: string;

    username: string;
}