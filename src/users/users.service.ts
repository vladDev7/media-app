import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
// import { Prisma } from 'generated/prisma/client';
// import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from './users.repository';
import { UserCreateDto, UserDto } from 'contracts';

@Injectable()
export class UsersService {
  constructor(
    // private databaseService: DatabaseService
    private userRepository: UserRepository,
  ) {}

  async create(data: UserCreateDto): Promise<UserDto> {
    const saltedUser = { ...data, password: await hash(data.password, 10) }; // TODO: update salt
    return this.userRepository.create(saltedUser);
  }

  async findOne(data: { email: string }): Promise<UserDto> {
    const { email } = data;
    const user = await this.userRepository.findOne(email);

    if (!user) {
      throw new Error();
    }
    return user;
  }
}
