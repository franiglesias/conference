import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProposalHandler } from './application/CreateProposalHandler';
import { MemoryProposalRepository } from './infrastructure/MemoryProposalRepository';
import { PROPOSAL_REPOSITORY } from './domain/ProposalRepository';
import { UlidIdentityService } from './infrastructure/UlidIdentityService';
import { IDENTITY_SERVICE } from './domain/IdentityService';
import { GetAllProposalsHandler } from './application/GetAllProposalsHandler';
import { GetOneProposalQuery } from './application/GetOneProposalQuery';
import { ProposalsController } from './ui/ProposalsController';

@Module({
  imports: [CqrsModule],
  controllers: [ProposalsController],
  providers: [
    CreateProposalHandler,
    GetAllProposalsHandler,
    GetOneProposalQuery,
    {
      provide: PROPOSAL_REPOSITORY,
      useClass: MemoryProposalRepository,
    },
    {
      provide: IDENTITY_SERVICE,
      useClass: UlidIdentityService,
    },
  ],
})
export class ProposalModule {}
