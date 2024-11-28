import { Injectable } from '@nestjs/common';
import { Proposal } from '../domain/Proposal/Proposal';
import { ProposalRepository } from '../domain/Proposal/ProposalRepository';

// @Injectable() is a decorator that marks a class as available to be provided and injected as a dependency.
// You can find MemoryProposalRepository in the providers array of the Module that uses it.
@Injectable()
export class MemoryProposalRepository implements ProposalRepository {
  private readonly proposals: Proposal[] = [];

  async store(proposal: Proposal): Promise<void> {
    this.proposals.push(proposal);
  }

  async retrieve(id: string): Promise<Proposal> {
    return this.proposals.find((proposal) => {
      return proposal.isIdentifiedBy(id);
    });
  }

  async retrieveAll(): Promise<Proposal[]> {
    return this.proposals;
  }
}
