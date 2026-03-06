import { Injectable, Inject } from '@nestjs/common';
import { UserCreateInput } from 'generated/prisma/models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') 
        private userService: UsersService,
    ) {}

    register(data: UserCreateInput) {
        console.log(data)
        return this.userService.create(data)
    }
}
