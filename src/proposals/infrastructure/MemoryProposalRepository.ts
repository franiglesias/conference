import { Injectable } from '@nestjs/common';
import { Proposal } from '../domain/Proposal';
import { ProposalRepository } from '../domain/ProposalRepository';

// @Injectable() is a decorator that marks a class as available to be provided and injected as a dependency.
// You can find MemoryProposalRepository in the providers array of the Module that uses it.
@Injectable()
export class MemoryProposalRepository implements ProposalRepository {
  private readonly proposals: Proposal[] = [];

  async create(
    id: string,
    title: string,
    description: string,
    author: string,
    email: string,
    event: string,
    track: string,
  ): Promise<void> {
    const proposal = new Proposal(
      id,
      title,
      description,
      author,
      email,
      event,
      track,
      'TBD',
    );
    this.store(proposal);
  }

  store(proposal: Proposal): void {
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
