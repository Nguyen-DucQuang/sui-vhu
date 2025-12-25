import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventsModule } from '../events/events.module';
import { SuiService } from '../sui/sui.service';

@Module({
  controllers: [AdminController],
  imports: [EventsModule],
  providers: [AdminService, PrismaService, SuiService],
  exports: [AdminService],
})
export class AdminModule {}
