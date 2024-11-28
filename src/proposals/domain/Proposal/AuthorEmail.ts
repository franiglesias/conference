import { Email } from '../validators/Email';

export class AuthorEmail {
  private readonly email: string;

  public constructor(email: string) {
    this.email = Email(email, 'Author email must be valid');
  }

  public toString() {
    return this.email;
  }
}
