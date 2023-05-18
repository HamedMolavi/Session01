import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { } // Repository is a handler that includes all
    // the models and work with them when called. It is something like this:
    // Database <--- ORM <----> Repository
    //                              |
    //                              |
    //                              |
    //                             \ /
    //                        -------------
    //                      | model1, model2
    //                      |   schema1 , schema2
    // InjectRepository is a decorator to set some configs and methods on repository using a specified model and inject it inside
    // the service (in this case UserService).

    async findAllUsers(): Promise<User[]> { // This is a service, written to be used in serveral places. So write services relevant and reusable.
        // Note the type of returned value. It is a promise, when resolved it returns an array of users.
        return await this.userRepository.find(); // We didn't use try catch, because when this conters an error, nest automatically
        // detects the error and pass the right object to the error pipeline defined in app.module at end of procedure.
        // The format of all errors is like this:
        /*
        {
            "statusCode": 400,
            "error": "Bad Request",
            "message": ["Some little detail."]
        }
        */
    };

    async findOneUser(id: null | number, username: string | undefined = undefined) {
        if (!id && !username) throw new Error(`Error in using findOneUser:\nUsage:
        find user by id -> findOneUser(user_id)
        find user by username\nfindOneUser(null, user_username)`);
        return await this.userRepository.findOne({ where: id ? { id } : { username } });
    };

    async createUser(body: CreateUserDto): Promise<boolean> {
        const newUser: User = this.userRepository.create(body);
        await this.userRepository.save(newUser);
        return true;
    };

    async updateUser(id: number, body: UpdateUserDto): Promise<User> {
        this.userRepository.update(id, body);
        return this.findOneUser(id);
    };

    async deleteUser(id: number): Promise<boolean> {
        try {
            this.userRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        };
    };
}
