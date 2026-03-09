import { Injectable, Inject } from '@nestjs/common';
import { UserCreateInput } from 'generated/prisma/models';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs'
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') 
        private userService: UsersService,
    ) {}

    async register(data: UserCreateInput) {
        return this.userService.create(data)
    }

    async validateUser(login: string, password: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.userService.findOne({ login });

        if (!user) {
            throw new Error('User was not found');
        }

        const isPasswordValid = await compare(password, user.password);

        if (isPasswordValid) {
            const {password: _, ...result} = user;

            return result
        }

        return null;
    }
}
