import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  home() {}

  @Get('chat')
  @Render('chat')
  chat(@Query('nickname') nickname: string) {
    return {
      title: `${nickname}님의 채팅방`,
      nickname
    };
  }
}
