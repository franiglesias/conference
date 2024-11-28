import { Proposal } from './Proposal';

export interface ProposalRepository {
  store(proposal: Proposal): Promise<void>;

  retrieve(id: string): Promise<Proposal>;

  retrieveAll(): Promise<Proposal[]>;
}

export const PROPOSAL_REPOSITORY = Symbol('ProposalRepository');
