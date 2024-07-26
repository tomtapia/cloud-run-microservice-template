import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HomeController } from '../http/controllers/home.controller';
@Module({
  imports: [CqrsModule],
  controllers: [HomeController],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
