import { Inject } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

export class UserRepository {
  constructor(
    @Inject()
    private databaseService: DatabaseService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.databaseService.user.create({ data });
  }

  async findOne(email: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error();
    }
    return user;
  }

  async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new Error();
    }
    return user;
  }
}
