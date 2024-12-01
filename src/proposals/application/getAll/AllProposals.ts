import { GetAllProposalsViewModel } from './GetAllProposalsViewModel';

export interface AllProposals {
  read(): Promise<GetAllProposalsViewModel[]>;
}

export const ALL_PROPOSALS = Symbol('ReadGetAllProposals');
