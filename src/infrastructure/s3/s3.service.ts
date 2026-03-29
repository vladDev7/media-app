import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import infrastructureConfig from 'src/config/infrastructure.config';
import { LINK_EXPIRATION_TIME, S3_CLIENT } from './s3.constants';

@Injectable()
export class S3Service {
  private bucket: string;
  constructor(
    @Inject(infrastructureConfig.KEY)
    private readonly config: ConfigType<typeof infrastructureConfig>,

    @Inject(S3_CLIENT)
    private readonly s3Client: S3Client,
  ) {
    this.bucket = config.s3_media_bucket;
  }

  async uploadFile(storage_key: string, file: Express.Multer.File): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: storage_key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);
  }

  async getSignedUrl(storage_key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: storage_key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: LINK_EXPIRATION_TIME });
  }

  async deleteFile(storage_key: string): Promise<void> {
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: storage_key });

    await this.s3Client.send(command);
  }
}
