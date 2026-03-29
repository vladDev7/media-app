import infrastructureConfig from 'src/config/infrastructure.config';
import { S3_CLIENT } from './s3.constants';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';

export const S3ClientProvider = {
  provide: S3_CLIENT,
  useFactory: (config: ConfigType<typeof infrastructureConfig>) => {
    return new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.access_key_id,
        secretAccessKey: config.access_key_secret,
      },
      endpoint: config.endpoint,
      forcePathStyle: true,
    });
  },
  inject: [infrastructureConfig.KEY],
};
