import { Module } from '@nestjs/common';
import { IndexerModule } from './indexer/indexer.module';
import { AiModule } from './ai/ai.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaService } from './prisma/prisma.service';
import { EventsModule } from './events/events.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AdminModule } from './admin/admin.module';
import { NftsModule } from './nfts/nfts.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [IndexerModule, AiModule, InvoicesModule, TransactionsModule, AdminModule, EventsModule, NftsModule],
  controllers: [UsersController],
  providers: [PrismaService],
})
export class AppModule {}
