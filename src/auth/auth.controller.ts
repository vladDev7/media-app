import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/')
    async register(@Body() data: Prisma.UserCreateInput) {
        return this.authService.register(data);
    }
}
