import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from './GetAllProposalsQuery';
import { Inject } from '@nestjs/common';
import { GetAllProposalsViewModel } from './GetAllProposalsViewModel';
import {
  READ_GET_ALL_PROPOSALS,
  ReadGetAllProposals,
} from './ReadGetAllProposals';

@QueryHandler(GetAllProposalsQuery)
export class GetAllProposalsHandler
  implements IQueryHandler<GetAllProposalsQuery>
{
  constructor(
    @Inject(READ_GET_ALL_PROPOSALS)
    private readonly proposals: ReadGetAllProposals,
  ) {}

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _query: GetAllProposalsQuery,
  ): Promise<GetAllProposalsViewModel[]> {
    return await this.proposals.read();
  }
}
