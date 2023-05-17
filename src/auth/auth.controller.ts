import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { Body, ConflictException, Controller, Get, HttpCode, Inject, Param, Post, forwardRef } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto, LogoutDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private authService: AuthService
    ) { };

    @Get('login')
    async name(): Promise<string> {
        return await `Please login useing this command:
        curl --location localhost:3000/auth/login --header "Content-Type: application/json" -d "{\"username\":\"hamed\",\"password\":\"21356\"}"
The response would be a 'key' you should use in your request headers like:
-H "authorization: Bearer your_key"
Or set in headers using your client service.`}; // render login page.


    @Post('signup')
    @HttpCode(201)
    async signup(@Body() body: CreateUserDto): Promise<boolean> {
        const duplicated: User = await this.userService.findOneUser(null, body.username);
        if (!!duplicated) throw new ConflictException("Username already exists!"); // this error will be passed to error handler with 409 status code
        return await this.userService.createUser(body);
    };

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginDto): Promise<string> {
        const user: User = await this.userService.findOneUser(null, body.username);
        if (!user) throw new NotFoundException("User not found!");
        if (user.password !== body.password) throw new NotFoundException("User not found!");
        return await this.authService.login(user, body.rememberMe);
    };

    @Post('logout')
    @HttpCode(204)
    async logout(@Body() body: LogoutDto): Promise<void> {
        return await this.authService.logout(body.token);
    };
}
