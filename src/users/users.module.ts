import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      useClass: UsersService,
      provide: 'USER_SERVICE',
    },
    UserRepository,
  ],
  controllers: [UsersController],
  exports: [
    {
      useClass: UsersService,
      provide: 'USER_SERVICE',
    },
  ],
})
export class UsersModule {}
