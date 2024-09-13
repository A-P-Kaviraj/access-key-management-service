import { Module } from '@nestjs/common';
import { AccessKeyController } from '../controllers/access-key.controller';
import { AccessKeyService } from '../services/acess-key.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AccessKeyController],
  providers: [AccessKeyService, PrismaService],
})
export class AppModule {}
