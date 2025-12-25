import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private txService: TransactionsService) {}

  @Post('complete')
  async complete(@Body() body: any) {
    try {
      const result = await this.txService.completeTransaction(body);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  }

  // Verify a transaction by txHash — check local DB and optionally return Sui Explorer link
  @Get('verify')
  async verify(@Query('txHash') txHash: string) {
    if (!txHash) return { success: false, error: 'txHash is required' };
    const tx = await this.txService.findByHash(txHash);
    const explorer = `https://explorer.sui.io/txblock/${txHash}`;
    return { success: true, tx, explorer };
  }

  @Get('user/:address')
  async byUser(
    @Param('address') address: string,
    @Query('page') page = '1',
    @Query('size') size = '20',
  ) {
    if (!address) return { success: false, error: 'address is required' };
    const pageNum = parseInt(page as any, 10) || 1;
    const sizeNum = parseInt(size as any, 10) || 20;
    const result = await this.txService.findByUserAddress(address, pageNum, sizeNum);
    const explorerBase = 'https://explorer.sui.io/txblock';
    const transactions = (result.transactions || []).map((tx: any) => ({
      ...tx,
      explorer: `${explorerBase}/${tx.txHash}`,
    }));
    return { success: true, user: result.user, total: result.total, page: pageNum, size: sizeNum, transactions };
  }
}
