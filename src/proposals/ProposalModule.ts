import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProposalHandler } from './application/create/CreateProposalHandler';
import { PROPOSAL_REPOSITORY } from './domain/Proposal/ProposalRepository';
import { UlidIdentityService } from './infrastructure/UlidIdentityService';
import { IDENTITY_SERVICE } from './domain/IdentityService';
import { GetAllProposalsHandler } from './application/getAll/GetAllProposalsHandler';
import { GetOneProposalQuery } from './application/getOne/GetOneProposalQuery';
import { ProposalsController } from './ui/ProposalsController';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteProposalRepository } from './infrastructure/SqliteProposalRepository';
import { READ_GET_ALL_PROPOSALS } from './application/getAll/ReadGetAllProposals';
import { SqliteReadGetAllProposals } from './infrastructure/SqliteReadGetAllProposals';

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
    {
      provide: READ_GET_ALL_PROPOSALS,
      useClass: SqliteReadGetAllProposals,
    },
  ],
})
export class ProposalModule {}
