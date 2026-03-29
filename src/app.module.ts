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
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import appConfigValidationSchema from './config/app.config.validationSchema';
import appConfig from './config/app.config';
import infrastructureConfigValidationSchema from './config/infrastructure.config.validationSchema';
import infrastructureConfig from './config/infrastructure.config';
import { MediaModule } from './media/media.module';

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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [infrastructureConfig],
      validate: (config) => {
        return infrastructureConfigValidationSchema.parse(config);
      },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MediaModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
