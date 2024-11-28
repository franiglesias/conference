import { NotEmptyString } from '../validators/NotEmptyString';

export class ProposalTitle {
  private readonly title: string;

  constructor(title: string) {
    this.title = NotEmptyString(title, 'Title must not be empty');
  }

  public toString() {
    return this.title;
  }
}
