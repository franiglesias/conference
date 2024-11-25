import { Injectable } from '@nestjs/common';
import { Proposal } from '../domain/Proposal';
import { PROPOSAL_REPOSITORY } from '../domain/ProposalRepository';

@Injectable()
export class MemoryProposalRepository implements PROPOSAL_REPOSITORY {
  private readonly proposals: Proposal[] = [];
  private nextId = 1;

  create(title: string, description: string, author: string): Proposal {
    const id = this.nextId;
    const proposal = new Proposal(id, title, description, author);
    this.proposals.push(proposal);
    this.nextId++;
    return proposal;
  }

  retrieve(id: number): Proposal {
    const found = this.proposals.find((proposal) => {
      return proposal.isIdentifiedBy(id);
    });

    return found;
  }

  retrieveAll() {
    return this.proposals;
  }
}
