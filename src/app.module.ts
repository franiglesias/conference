import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ProposalModule } from './proposals/ProposalModule';

@Module({
  imports: [CqrsModule, ProposalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
