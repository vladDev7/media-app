import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    constructor(
        private databaseService: DatabaseService,
    ) {}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.databaseService.user.create({data});
    }
}
