import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  root(): string {
    return 'This action returns an empty response';
  }
}
