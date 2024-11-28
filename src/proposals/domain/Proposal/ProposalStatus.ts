import { OneOf } from '../validators/OneOf';
import { NotEmptyString } from '../validators/NotEmptyString';

export class ProposalStatus {
  private readonly value: string;

  constructor(value: string) {
    // Example of composable validators. Maybe we don't need them to be objects
    this.value = OneOf(
      NotEmptyString(value, 'Status cannot be empty'),
      ['draft', 'submitted', 'accepted', 'rejected'],
      'Invalid proposal status',
    );
  }
}
