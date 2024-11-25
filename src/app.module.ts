import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProposalsController } from './proposals/ui/ProposalsController';
import { PROPOSAL_REPOSITORY } from './proposals/domain/ProposalRepository';
import { MemoryProposalRepository } from './proposals/infrastructure/MemoryProposalRepository';

@Module({
  imports: [],
  controllers: [AppController, ProposalsController],
  providers: [
    AppService,
    { provide: PROPOSAL_REPOSITORY, useClass: MemoryProposalRepository },
  ],
})
export class AppModule {}
