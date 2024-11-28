import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProposalCommand } from './CreateProposalCommand';
import { Inject } from '@nestjs/common';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/Proposal/ProposalRepository';
import { IDENTITY_SERVICE, IdentityService } from '../domain/IdentityService';
import { Proposal } from '../domain/Proposal/Proposal';

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
    const received = Proposal.receive(
      theId,
      command.title,
      command.description,
      command.author,
      command.email,
      command.event,
      command.track,
      command.type,
    );
    await this.proposals.store(received);
    return theId;
  }
}
