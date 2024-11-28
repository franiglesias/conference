import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from './GetAllProposalsQuery';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../../domain/Proposal/ProposalRepository';
import { Proposal } from '../../domain/Proposal/Proposal';
import { Inject } from '@nestjs/common';
import { GetAllProposalsViewModel } from './GetAllProposalsViewModel';

@QueryHandler(GetAllProposalsQuery)
export class GetAllProposalsHandler
  implements IQueryHandler<GetAllProposalsQuery>
{
  constructor(
    @Inject(PROPOSAL_REPOSITORY) private readonly proposals: ProposalRepository,
  ) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: GetAllProposalsQuery,
  ): Promise<GetAllProposalsViewModel[]> {
    const allProposal = await this.proposals.retrieveAll();

    return allProposal.map((proposal: Proposal) => {
      return proposal.mapTo(
        new GetAllProposalsViewModel(),
      ) as GetAllProposalsViewModel;
    });
  }
}
