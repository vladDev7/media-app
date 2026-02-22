import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import configValidationSchema from './config/config.validationSchema';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: configValidationSchema,
    validationOptions: {
      abortEarly: false,
      allowUnknown: false,
    },
    load: [databaseConfig],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
