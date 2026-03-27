import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import databaseConfig from './config/database.config';
import databaseConfigValidationSchema from './config/database.config.validationSchema';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import appConfigValidationSchema from './config/app.config.validationSchema';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: databaseConfigValidationSchema,
      validationOptions: {
        abortEarly: false,
        // allowUnknown: false,
      },
      load: [databaseConfig],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: appConfigValidationSchema,
      validationOptions: {
        abortEarly: false,
        // allowUnknown: false,
      },
      load: [appConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MediaMetadata,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
