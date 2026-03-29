import { Inject } from '@nestjs/common';
import { Prisma, File } from 'generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

export class MediaRepository {
  constructor(
    @Inject()
    private databaseService: DatabaseService,
  ) {}

  async create(user_id: number, data: Prisma.FileCreateInput): Promise<File> {
    return this.databaseService.file.create({ data: { ...data, user: { connect: { id: user_id } } } });
  }
}
