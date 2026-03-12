import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/')
    async register(@Body() data: Prisma.UserCreateInput) {
        return this.authService.register(data);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/logout')
    async logout(@Request() req) {
        return req.logout();
    }
}
