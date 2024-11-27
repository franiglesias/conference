import { Proposal } from './Proposal';

export interface ProposalRepository {
  create(
    id: string,
    title: string,
    description: string,
    author: string,
    email: string,
    event: string,
    track: string,
  ): Promise<void>;

  retrieve(id: string): Promise<Proposal>;

  retrieveAll(): Promise<Proposal[]>;
}

export const PROPOSAL_REPOSITORY = Symbol('ProposalRepository');
