import {
    Controller, Get, Post, Body, Param, HttpCode, UseInterceptors, ClassSerializerInterceptor, Put, Delete, Request,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { BadRequestException, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { Request as Req } from 'express';

@UseInterceptors(ClassSerializerInterceptor) // To serialize data flow and apply entity setting (like exclude).
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { } // Do NOT inject models here. You work with models in services.

    @Get()
    async getUsers(@Request() req: Req): Promise<User[]> {
        if (!req.res.locals.user || req.res.locals.user.role !== 'admin') throw new UnauthorizedException("Not Authorized!");
        return await this.userService.findAllUsers();
    };

    @Get('/:id')
    async getUser(@Param('id') id: number, @Request() req: Req): Promise<User> {
        if (!req.res.locals.user || req.res.locals.user.role !== 'admin') throw new UnauthorizedException("Not Authorized!");
        return await this.userService.findOneUser(id);
    };

    @Put()
    @UsePipes(new ValidationPipe({
        whitelist: true // this will strip non-decleared properties off the object.
    }))
    @HttpCode(200)
    async updateUser(@Request() req: Req, @Body() body: UpdateUserDto): Promise<User> {
        if (!req.res.locals.user) throw new UnauthorizedException("Please login first.");
        const id = req.res.locals.user.id;
        return await this.userService.updateUser(id, body);
    };

    @Put('/:id')
    @UsePipes(new ValidationPipe({
        whitelist: true // this will strip non-decleared properties off the object.
    }))
    @HttpCode(200)
    async updateAnotherUser(@Param('id') id: number, @Request() req: Req, @Body() body: UpdateUserDto): Promise<User> {
        if (!id) throw new BadRequestException("Bad request!")
        if (!req.res.locals.user || req.res.locals.user.role !== 'admin') throw new UnauthorizedException("Not Authorized!");
        return await this.userService.updateUser(id, body);
    };


    @Delete()
    @HttpCode(204)
    async deleteUser(@Request() req: Req): Promise<void> {
        if (!req.res.locals.user) throw new UnauthorizedException("Please login first.");
        const id = req.res.locals.user.id;
        if (await this.userService.deleteUser(id)) req.res.locals.user = undefined;
        else throw new InternalServerErrorException("Something went wrong!")
    };
};
