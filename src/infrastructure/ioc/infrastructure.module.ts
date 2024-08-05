import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HomeController } from '../http/controllers/home.controller';
import { MetadataController } from '../http/controllers/metadata.controller';
@Module({
  imports: [CqrsModule],
  controllers: [HomeController, MetadataController],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
