import { Proposal } from './Proposal';

export interface ProposalRepository {
  create(title: string, description: string, author: string): Proposal;

  retrieve(id: number): Proposal;

  retrieveAll(): Proposal[];
}

export const PROPOSAL_REPOSITORY = Symbol('ProposalRepository');
