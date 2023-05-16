import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common/exceptions';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { } // Do NOT inject models here. You work with models in services.

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.findAllUsers();
    }

    @Get('/:id')
    async getUser(@Param('id') id: number): Promise<User> {
        return await this.userService.findOneUser(id);
    }

    @Post()
    @HttpCode(201)
    async addUser(@Body() body: CreateUserDto) {
        // @Body() decorates body based on CreateUserDto and does the validation.
        // So by passing the type 'CreateUserDto', nest realizes that 'body' should be compatibale with that DTO and
        // returns error to the error handler if other wise.
        // For other forms of inputs we should use the appropriate decorator, for example to use params:
        /*
        @Get(:p)
        f(@Param() p: typeofparam){}
        */
        const duplicated = await this.userService.findOneUser(null, body.username);
        if (!!duplicated) throw new ConflictException("Username already exists!") // this error will be passed to error handler with 409 status code
        return await this.userService.createUser(body);
    }

}
