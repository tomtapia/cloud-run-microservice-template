import { Controller, Get } from '@nestjs/common';

@Controller('home')
export class HomeController {
  @Get()
  find(): string {
    return 'This action returns an empty response';
  }
}
