import { NotEmptyString } from '../validators/NotEmptyString';

export class ProposalId {
  private readonly id: string;

  public constructor(id: string) {
    this.id = NotEmptyString(id, 'Id must not be empty');
  }

  public toString() {
    return this.id;
  }
}
