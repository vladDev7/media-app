import { Injectable, Inject } from '@nestjs/common';
import { UserCreateInput } from 'generated/prisma/models';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { User } from 'generated/prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: UserCreateInput) {
    return this.userService.create(data);
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne({ login });

    if (!user) {
      throw new Error('User was not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid) {
      const { password: _, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
