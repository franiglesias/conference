export class CreateProposalDto {
  public readonly title: string;
  public readonly description: string;
  public readonly author: string;

  constructor(title: string, description: string, author: string) {
    this.title = title;
    this.description = description;
    this.author = author;
  }
}
