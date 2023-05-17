import { Controller, Get, Post, Body, Param, HttpCode, UseInterceptors, ClassSerializerInterceptor, Put, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common/exceptions';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor) // To serialize data flow and apply entity setting (like exclude).
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { } // Do NOT inject models here. You work with models in services.

    // Add admin role for these
    // @Get()
    // async getUsers(): Promise<User[]> {
    //     return await this.userService.findAllUsers();
    // };

    // Add admin role for these
    // @Get('/:id')
    // async getUser(@Param('id') id: number): Promise<User> {
    //     return await this.userService.findOneUser(id);
    // };

    @Put()
    @HttpCode(200)
    async updateUser(@Req() req: Request): Promise<Request>{ //: Promise<User>, @Body() body: UpdateUserDto
        return req;
        // return 'ok'
        // return await this.userService.updateUser(body);
    };

    @Delete('/:id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    };
};
