import { NotEmptyString } from '../validators/NotEmptyString';

export class AuthorName {
  private readonly name: string;
  private readonly surname: string;

  constructor(name: string, surname: string) {
    this.name = NotEmptyString(name, 'Author name is mandatory');
    this.surname = NotEmptyString(surname, 'Author name is mandatory');
  }

  firstName(): string {
    return this.name;
  }

  lastName(): string {
    return this.surname;
  }

  toString() {
    return `${this.name} ${this.surname}`;
  }
}
