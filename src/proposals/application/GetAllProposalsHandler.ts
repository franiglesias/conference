import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from './GetAllProposalsQuery';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/ProposalRepository';
import { Proposal } from '../domain/Proposal';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAllProposalsQuery)
export class GetAllProposalsHandler
  implements IQueryHandler<GetAllProposalsQuery>
{
  constructor(
    @Inject(PROPOSAL_REPOSITORY) private readonly proposals: ProposalRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetAllProposalsQuery): Promise<Proposal[]> {
    return this.proposals.retrieveAll();
  }
}
