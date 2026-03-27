import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto, UserInnerDto } from 'contracts';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: UserCreateDto) {
    return this.userService.create(data);
  }

  async validateUser(email: string, password: string): Promise<UserInnerDto | null> {
    const user = await this.userService.findOne({ email });

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

  login(user: UserInnerDto) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
