import { NotEmptyString } from '../validators/NotEmptyString';

export class ProposalDescription {
  private readonly description: string;

  constructor(description: string) {
    this.description = NotEmptyString(
      description,
      'Description must not be empty',
    );
  }

  public toString() {
    return this.description;
  }
}
