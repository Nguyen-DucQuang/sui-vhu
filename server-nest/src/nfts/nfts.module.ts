import { Module } from '@nestjs/common';
import { NftsController } from './nfts.controller';
import { AdminModule } from '../admin/admin.module';
import { SuiModule } from '../sui/sui.module';

@Module({
  imports: [AdminModule, SuiModule],
  controllers: [NftsController],
})
export class NftsModule {}
