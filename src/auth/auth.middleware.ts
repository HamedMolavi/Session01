import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private userService: UserService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if (!!req.headers['authorization']) {
            // get token from request headers
            const token: string = req.headers['authorization'].match(/Bearer (.*)/i)[1];
            // responsive id for token
            const id: number = await AuthService.keyv.get(token);
            // probably fake token or expired
            if (!id) throw new UnauthorizedException("Token not returned!");
            const user: User = await this.userService.findOneUser(id);
            // Deleted user
            if (!user) throw new UnauthorizedException("Not authorized.");
            // set user in locals: use req.res instead of res, because when calling res in auth.controller you cant return any value and
            // you should use res like epress in that way. So use req to somehow cover that issue.
            // If you are using res, any serialization procedure would be surpassed.
            req.res.locals.user = user;
        } else if (!req.path.match('/auth')) {
            // No auth header and no /auth in path:
            throw new UnauthorizedException("Token not set!");
        };
        next();
    };
}
