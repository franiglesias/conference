export class Proposal {
  private readonly id: string;
  private readonly title: string;
  private readonly description: string;
  private readonly author: string;
  private readonly email: string;
  private readonly event: string;
  private readonly track: string;
  private readonly type: string;

  constructor(
    id: string,
    title: string,
    description: string,
    author: string,
    email: string,
    event: string,
    track: string,
    type: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.email = email;
    this.event = event;
    this.track = track;
    this.type = type;
  }

  isIdentifiedBy(id: string) {
    return this.id === id;
  }
}
