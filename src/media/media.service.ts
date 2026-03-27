import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class MediaService {
  async uploadFile(file: Express.Multer.File) {
    return Promise.resolve(file.size);
  }

  async deleteFile(id: number) {
    await Promise.resolve(id);
    throw new NotImplementedException();
  }
}
