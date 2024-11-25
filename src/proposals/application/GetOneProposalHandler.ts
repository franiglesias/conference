import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProposalRepository } from '../domain/ProposalRepository';
import { Proposal } from '../domain/Proposal';
import { GetOneProposalQuery } from './GetOneProposalQuery';

@CommandHandler(GetOneProposalQuery)
export class GetOneProposalHandler
  implements IQueryHandler<GetOneProposalQuery>
{
  constructor(private readonly proposals: ProposalRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetOneProposalQuery): Promise<Proposal> {
    return this.proposals.retrieve(query.id);
  }
}
