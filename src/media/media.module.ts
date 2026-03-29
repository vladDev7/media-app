import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { DatabaseModule } from 'src/database/database.module';
import { MediaRepository } from './media.repository';

@Module({
  imports: [DatabaseModule, InfrastructureModule],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
})
export class MediaModule {}
