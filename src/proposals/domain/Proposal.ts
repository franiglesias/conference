export class Proposal {
  private readonly id: string;
  private readonly title: string;
  private readonly description: string;
  private readonly author: string;

  constructor(id: string, title: string, description: string, author: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
  }

  isIdentifiedBy(id: string) {
    return this.id === id;
  }
}
