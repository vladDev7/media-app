import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import databaseConfig from 'src/config/database.config';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(
        @Inject(databaseConfig.KEY)
        private readonly config: ConfigType<typeof databaseConfig>
    ) {
        const adapter = new PrismaPg({ connectionString: config.url })
        super({ adapter });
    }
}
