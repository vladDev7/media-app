import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Prisma, User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const saltedUser = { ...data, password: await hash(data.password, 10) }; // TODO: update salt
    return this.databaseService.user.create({ data: saltedUser });
  }

  async findOne(data: { login: string }): Promise<User> {
    const { login } = data;
    const user = await this.databaseService.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new Error();
    }
    return user;
  }
}
