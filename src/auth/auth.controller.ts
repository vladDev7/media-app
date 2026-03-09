import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/')
    async register(@Body() data: Prisma.UserCreateInput) {
        return this.authService.register(data);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
        return req.user
    }
}
