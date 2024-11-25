import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProposalCommand } from './CreateProposalCommand';
import { Inject } from '@nestjs/common';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/ProposalRepository';

@CommandHandler(CreateProposalCommand)
export class CreateProposalHandler
  implements ICommandHandler<CreateProposalCommand>
{
  constructor(
    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposals: ProposalRepository,
  ) {}

  async execute(command: CreateProposalCommand): Promise<void> {
    this.proposals.create(command.title, command.description, command.author);
  }
}
