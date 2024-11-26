import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProposalCommand } from './CreateProposalCommand';
import { Inject } from '@nestjs/common';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/ProposalRepository';
import { IDENTITY_SERVICE, IdentityService } from '../domain/IdentityService';

@CommandHandler(CreateProposalCommand)
export class CreateProposalHandler
  implements ICommandHandler<CreateProposalCommand>
{
  constructor(
    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposals: ProposalRepository,
    @Inject(IDENTITY_SERVICE)
    private readonly identityService: IdentityService,
  ) {}

  async execute(command: CreateProposalCommand): Promise<string> {
    const theId = this.identityService.create();
    this.proposals.create(
      theId,
      command.title,
      command.description,
      command.author,
    );
    return theId;
  }
}
