import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { S3Service } from 'src/infrastructure/s3/s3.service';
import { MediaRepository } from './media.repository';
import { FileStatus } from 'generated/prisma/enums';

@Injectable()
export class MediaService {
  constructor(
    @Inject()
    private s3Service: S3Service,

    @Inject()
    private databaseService: DatabaseService,

    @Inject()
    private mediaRepository: MediaRepository,
  ) {}
  async uploadFile(userId: number, file: Express.Multer.File) {
    const storage_key = `${userId}/${file.originalname}`;
    console.log(storage_key);
    await this.databaseService.$transaction(async () => {
      await this.s3Service.uploadFile(storage_key, file);

      const data = {
        filename: file.originalname,
        storage_key,
        mime_type: file.mimetype,
        size_bytes: file.size,
        user: {
          connect: { id: userId },
        },
        status: FileStatus.uploaded,
      };
      await this.mediaRepository.create(userId, data);
    });
  }

  async deleteFile(id: number) {
    await Promise.resolve(id);
    throw new NotImplementedException();
  }
}
