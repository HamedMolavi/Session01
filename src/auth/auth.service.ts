import { Injectable } from '@nestjs/common';
import * as Keyv from 'keyv';
import { User } from 'src/user/user.entity';
import { v4 as uuid } from 'uuid';



@Injectable()
export class AuthService {
    static keyv = new Keyv();

    async login(user: User, rememberMe: boolean): Promise<string> {
        const token = uuid();
        const mustSetSession: number = 604800000;
        await AuthService.keyv.set(token, user.id, rememberMe ? 604800000 : mustSetSession); // true
        return token;
    };
    async logout(token: string): Promise<void> {
        await AuthService.keyv.delete(token);
        return;
    };
}
