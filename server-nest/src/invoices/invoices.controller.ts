import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() body: any) {
    const { orderId, payload } = body;
    if (!orderId) return { error: 'orderId required' };
    return this.invoicesService.createInvoice(orderId, payload || {});
  }

  @Get()
  async list(@Query('limit') limit?: string) {
    const l = limit ? parseInt(limit, 10) : 20;
    return this.invoicesService.getInvoices(l);
  }
}
