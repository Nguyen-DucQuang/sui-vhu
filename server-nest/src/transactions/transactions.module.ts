import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EventsModule } from '../events/events.module';
import { SuiModule } from '../sui/sui.module';

@Module({
  imports: [EventsModule, SuiModule],
  providers: [TransactionsService, PrismaService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
