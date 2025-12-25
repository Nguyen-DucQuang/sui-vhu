import { Controller, Post, Body, Get } from '@nestjs/common';
import { IndexerService } from './indexer.service';

@Controller('indexer')
export class IndexerController {
  constructor(private readonly indexer: IndexerService) {}

  @Post('emit')
  async emitEvent(@Body() body: any) {
    // body: { txHash, type?, payload? }
    if (!body || !body.txHash) return { success: false, error: 'txHash required' };
    await this.indexer.indexEvent(body);
    return { success: true };
  }

  @Get('status')
  async status() {
    // lightweight status for demo
    return { success: true, message: 'Indexer controller available' };
  }
}
