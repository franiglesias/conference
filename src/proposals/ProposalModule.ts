import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProposalHandler } from './application/CreateProposalHandler';
import { PROPOSAL_REPOSITORY } from './domain/Proposal/ProposalRepository';
import { UlidIdentityService } from './infrastructure/UlidIdentityService';
import { IDENTITY_SERVICE } from './domain/IdentityService';
import { GetAllProposalsHandler } from './application/GetAllProposalsHandler';
import { GetOneProposalQuery } from './application/GetOneProposalQuery';
import { ProposalsController } from './ui/ProposalsController';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteProposalRepository } from './infrastructure/SqliteProposalRepository';

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature({})],
  controllers: [ProposalsController],
  providers: [
    CreateProposalHandler,
    GetAllProposalsHandler,
    GetOneProposalQuery,
    {
      provide: PROPOSAL_REPOSITORY,
      useClass: SqliteProposalRepository,
    },
    {
      provide: IDENTITY_SERVICE,
      useClass: UlidIdentityService,
    },
  ],
})
export class ProposalModule {}
