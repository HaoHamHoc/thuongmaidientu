import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { databaseProviders } from './database.providers';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, ...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {}
