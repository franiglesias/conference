import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from './GetAllProposalsQuery';
import { ProposalRepository } from '../domain/ProposalRepository';
import { Proposal } from '../domain/Proposal';

@CommandHandler(GetAllProposalsQuery)
export class GetAllProposalsHandler
  implements IQueryHandler<GetAllProposalsQuery>
{
  constructor(private readonly proposals: ProposalRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetAllProposalsQuery): Promise<Proposal[]> {
    return this.proposals.retrieveAll();
  }
}
