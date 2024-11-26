import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/ProposalRepository';
import { Proposal } from '../domain/Proposal';
import { GetOneProposalQuery } from './GetOneProposalQuery';
import { Inject } from '@nestjs/common';

@QueryHandler(GetOneProposalQuery)
export class GetOneProposalHandler
  implements IQueryHandler<GetOneProposalQuery>
{
  constructor(
    @Inject(PROPOSAL_REPOSITORY) private readonly proposals: ProposalRepository,
  ) {}

  async execute(query: GetOneProposalQuery): Promise<Proposal> {
    return this.proposals.retrieve(query.id);
  }
}
