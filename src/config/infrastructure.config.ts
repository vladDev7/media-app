import { registerAs } from '@nestjs/config';

export default registerAs('infrastructure', () => ({
  endpoint: process.env.AWS_ENDPOINT as string,
  region: process.env.AWS_REGION as string,
  access_key_id: process.env.AWS_ACCESS_KEY_ID as string,
  access_key_secret: process.env.AWS_SECRET_ACCESS_KEY as string,
  s3_media_bucket: process.env.AWS_S3_BUCKET_NAME as string,
}));
