import { GetAllProposalsViewModel } from './GetAllProposalsViewModel';

export interface ReadGetAllProposals {
  read(): Promise<GetAllProposalsViewModel[]>;
}

export const READ_GET_ALL_PROPOSALS = Symbol('ReadGetAllProposals');
