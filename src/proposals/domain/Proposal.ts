export class Proposal {
  private readonly id: number;
  private readonly title: string;
  private readonly description: string;
  private readonly author: string;

  constructor(id: number, title: string, description: string, author: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
  }

  isIdentifiedBy(id: number) {
    return this.id === id;
  }
}
