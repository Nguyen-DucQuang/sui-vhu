import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('valuate')
  async valuate(@Body() body: any) {
    const metadata = body?.metadata || body;
    const result = await this.aiService.valuate(metadata);
    return result;
  }

  @Get('analyses')
  async analyses(@Query('limit') limit = '20') {
    const lim = parseInt(limit as any, 10) || 20;
    const list = await this.aiService.listAnalyses(lim);
    return { success: true, data: list };
  }
}
