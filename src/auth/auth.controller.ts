import { Body, Controller, Post, UseGuards, Request, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth-guard';
import { SchemaValidationPipe } from 'src/helpers/pipes/schema.validation-pipe';
import { UserCreateSchema, UserCreateDto, UserLoginSchema, UserLoginDto } from 'contracts';
import type { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  @UsePipes(new SchemaValidationPipe(UserCreateSchema))
  async register(@Body() data: UserCreateDto) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @UsePipes(new SchemaValidationPipe(UserLoginSchema))
  login(@Request() req: UserLoginDto) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  logout(@Request() req: ExpressRequest) {
    return req.logout();
  }
}
