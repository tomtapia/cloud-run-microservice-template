import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HomeController } from '../adapters/inbound/http/controllers/home.controller';
import { MetadataController } from '../adapters/inbound/http/controllers/metadata.controller';
@Module({
  imports: [CqrsModule],
  controllers: [HomeController, MetadataController],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
