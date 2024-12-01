import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from './GetAllProposalsQuery';
import { Inject } from '@nestjs/common';
import { GetAllProposalsViewModel } from './GetAllProposalsViewModel';
import {
  ALL_PROPOSALS,
  AllProposals,
} from './AllProposals';

@QueryHandler(GetAllProposalsQuery)
export class GetAllProposalsHandler
  implements IQueryHandler<GetAllProposalsQuery>
{
  constructor(
    @Inject(ALL_PROPOSALS)
    private readonly proposals: AllProposals,
  ) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _query: GetAllProposalsQuery,
  ): Promise<GetAllProposalsViewModel[]> {
    return await this.proposals.read();
  }
}
