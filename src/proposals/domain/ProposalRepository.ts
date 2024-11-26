import { Proposal } from './Proposal';

export interface ProposalRepository {
  create(id: string, title: string, description: string, author: string): void;

  retrieve(id: string): Proposal;

  retrieveAll(): Proposal[];
}

export const PROPOSAL_REPOSITORY = Symbol('ProposalRepository');
