import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3ClientProvider } from './s3.provider';

@Module({
  providers: [S3ClientProvider, S3Service],
  exports: [S3Service],
})
export class S3Module {}
